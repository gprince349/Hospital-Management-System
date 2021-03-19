-- A patient can book an appointment with a doctor by paying money from 
-- their wallet and can choose a slot from available ones.

-- get list of doctors
select *
from staff s inner join doctor d using (id)

-- get available slot_intervals GIVEN (id)
with max_appoints as(
    select appoints_per_slot from doctor where id = ?),

    d_slot_name as(
        select slot_name from staff where id = ?),

    slots(slot_name, day, start_time, end_time) as(
        select * 
        from slot_interval
        where name = d_slot_name),

    slot_count(slot_name, day, start_time, count) as(
        select slot_name, day, start_time , count(*)
        from appointment
        where date_appoint >= current_date and time_start > current_time
        and doctor_id = ?
        group by slot_name, day, start_time)

select slot_name, day, start_time, end_time, coalasce(count, 0),
        (case when (day = extract(dow from current_date) and start_time =< current_time)
                    then current_date + 7
             when (day = extract(dow from current_date) and start_time > current_time)
                    then current_date
             else current_date + MOD(day - extract(dow from current_date) + 7, 7)
        end) as "date"
from slots left outer join slot_count using(slot_name, day, start_time)
where (count < max_appoints OR count is null)




-- pay and confirm slot booking GIVEN(date, day, slot_name, start_time, end_time, patient_id, fee)
-- creating a function to do booking
create or replace function book_appoint(max_appoints int, cur_appoints int, 
        appoint_date date, start_time time, end_time time, p_id int, d_id int, slot_name text, day int, fee int)
returns int
language plpgsql
as
$$
declare
   a integer;
begin
    select 0 into a;
    if (cur_appoints >= max_appoints) then
        raise exception 'slot is full';

    elseif ((select balance from patient where id = p_id) < fee) then
        raise exception 'insufficient balance in your wallet, recharge it';
    else
        insert into appointment(date_appoint, status, doctor_id, patient_id, slot_name, slot_day, start_time, end_time)
        values (appoint_date, 'schedualed', d_id, p_id, slot_name, day, appoint_time, end_time);

        update patient set balance = balance - fee where id = p_id;

        insert into wallet_transaction (patient_id, amount, service)
        values (p_id, -fee, 'appointment booking');
        
        select 1 into a;
    end if;
    return a;
end;
$$;

-- transaction to book appointment
BEGIN TRANSACTION;
with max_appoints as(
    select appoints_per_slot from doctor where id = ?),

    d_slot_name as(
        select slot_name from staff where id = ?),

    slots(slot_name, day, start_time, end_time) as(
        select * 
        from slot_interval
        where name = d_slot_name and day = ? and start_time = ? ),

    slot_count(slot_name, day, start_time, count) as(
        select slot_name, day, start_time , count(*)
        from appointment
        where date_appoint >= current_date and time_start > current_time
            and doctor_id = ? and day = ? and start_time = ?
        group by slot_name, day, start_time),

    cur_appoints as(
        select coalasce(count, 0)
        from slots left outer join slot_count using(slot_name, day, start_time))

-- this function will add transaction and update balance
select book_appoint (max_appoints, cur_appoints, date(?), time(?), p_id(?), d_id(?), fee(?));

COMMIT TRANSACTION;



-- adding money to waller from bank
BEGIN TRANSACTION;
insert into real_transaction(accountant_id, patient_id, amount) values (null, ?, ?);
update patient set balance = balance + ? where id = ?;
COMMIT TRANSACTION;


-- withdraw money from waller to bank
BEGIN TRANSACTION;
insert into real_transaction(accountant_id, patient_id, amount) values (null, ?, ?);
update patient set balance = balance - ? where id = ?;
COMMIT TRANSACTION;


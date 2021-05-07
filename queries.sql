-- A patient can book an appointment with a doctor by paying money from 
-- their wallet and can choose a slot from available ones.

-- get list of doctors
select *
from staff s inner join doctor d using (id)

-- get available slot_intervals GIVEN (id)
with slots(slot_name, day, start_time, end_time) as(
        select * 
        from slot_interval
        where name = (select slot_name from staff where id = 5)),

    slot_count(slot_name, day, start_time, count) as(
        select slot_name, slot_day, start_time , count(*)
        from appointment
        where date_appoint >= current_date and start_time > current_time
        and doctor_id = 5
        group by slot_name, slot_day, start_time)

select slot_name, day, start_time, end_time, coalesce(count, 0),
        (case when (day = extract(dow from current_date) and start_time < current_time)
                    then current_date + 7
             when (day = extract(dow from current_date) and start_time > current_time)
                    then current_date
             else current_date + MOD(cast(day - extract(dow from current_date) + 7 AS INTEGER), 7)
        end) as "date"
from slots left outer join slot_count using(slot_name, day, start_time)
where (count < (select appoints_per_slot from doctor where id = 5) OR count is null);




-- pay and confirm slot booking GIVEN(date, day, slot_name, start_time, end_time, patient_id, fee)
-- creating a function to do booking
-- create or replace function book_appoint(max_appoints int, cur_appoints int, 
--         appoint_date date, start_time time, end_time time, p_id int, d_id int, slot_name text, day int, fee int)
-- returns int
-- language plpgsql
-- as
-- $$
-- declare
--    a integer;
-- begin
--     select 0 into a;
--     if (cur_appoints >= max_appoints) then
--         raise exception 'slot is full';

--     elseif ((select balance from patient where id = p_id) < fee) then
--         raise exception 'insufficient balance in your wallet, recharge it';
--     else
--         insert into appointment(date_appoint, status, doctor_id, patient_id, slot_name, slot_day, start_time, end_time)
--         values (appoint_date, 'schedualed', d_id, p_id, slot_name, day, appoint_time, end_time);

--         update patient set balance = balance - fee where id = p_id;

--         insert into wallet_transaction (patient_id, amount, service)
--         values (p_id, -fee, 'appointment booking');
        
--         select 1 into a;
--     end if;
--     return a;
-- end;
-- $$;

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



-- adding money to wallet from bank
BEGIN TRANSACTION;
insert into real_transaction(accountant_id, patient_id, amount) values (null, ?, ?);
update patient set balance = balance + ? where id = ?;
COMMIT TRANSACTION;


-- withdraw money from wallet to bank
BEGIN TRANSACTION;
insert into real_transaction(accountant_id, patient_id, amount) values (null, ?, ?);
update patient set balance = balance - ? where id = ?;
COMMIT TRANSACTION;


-- staff login query
select * from staff where phone = ? and passwd_hash = ?;
-- now based on type field respond with appropriate interface
    





-- Analytics

select date_part('year',date_appoint) as year, date_part('month',date_appoint) as month, count(*) as Num_of_appointments 
from appointment 
group by date_part('year',date_appoint),date_part('month',date_appoint);

select date_part('year',date_appoint) as year, date_part('week',date_appoint) as week, count(*) as Num_of_appointments 
from appointment 
group by date_part('year',date_appoint),date_part('week',date_appoint);


with R as 
    (select doctor_id, count(*) as Num_of_appointments
        from appointment
        group by doctor_id)
    select id, name,Num_of_appointments from 
    R join staff on (R.doctor_id = staff.id);


select date_part('year',date_appoint) as year, date_part('month',date_appoint) as month, count(*) as Num_of_appointments 
from test_appointment 
group by date_part('year',date_appoint),date_part('month',date_appoint);

select date_part('year',date_appoint) as year, date_part('week',date_appoint) as week, count(*) as Num_of_appointments 
from test_appointment 
group by date_part('year',date_appoint),date_part('week',date_appoint);

with R as 
    (select test_id, count(*) as Num_of_appointments
        from test_appointment
        group by test_id)
    select test.test_id, test_name,Num_of_appointments from 
    R join test on (R.test_id = test.test_id);



/* No_of_patients for each disease (per month , per year) grouping by age, gender, location */

select P.diagnosis as disease, count(patient_id) as Num_of_patients
from appointment as A join prescription as P on (A.id = P.appointment_id)
group by diagnosis;

select date_part('year', A.date_appoint) as Year, P.diagnosis as disease, count(A.patient_id) as Num_of_patients
from appointment as A join prescription as P on (A.id = P.appointment_id)
group by date_part('year', A.date_appoint),P.diagnosis;

select date_part('month', A.date_appoint) as Month, P.diagnosis as disease, count(A.patient_id) as Num_of_patients
from appointment as A join prescription as P on (A.id = P.appointment_id)
group by date_part('month', A.date_appoint),P.diagnosis;

select P.diagnosis as disease, PT.gender, count(A.patient_id) as Num_of_patients
from (appointment as A join prescription as P on (A.id = P.appointment_id)) join patient as PT on (PT.id = A.patient_id )
group by P.diagnosis, PT.gender;



select P.diagnosis as disease, 
    case
    when (CURRENT_DATE- PT.dob) / 365.25 > 50 then '51 & over'
    when (CURRENT_DATE- PT.dob) / 365.25 > 19 then '20 - 30'
    when (CURRENT_DATE- PT.dob) / 365.25 > 30 then '31 - 50'
    else 'under 20'
  end as age_group
 ,count(A.patient_id) as Num_of_patients
from (appointment as A join prescription as P on (A.id = P.appointment_id)) join patient as PT on (PT.id = A.patient_id )
group by P.diagnosis,  age_group;


--Trending diseases in every season (which disease has most no of cases in particular season)

select date_part('month', A.date_appoint) as Month, P.diagnosis as disease, count(A.patient_id) as Num_of_patients
from appointment as A join prescription as P on (A.id = P.appointment_id)
group by date_part('month', A.date_appoint),P.diagnosis
order by Num_of_patients DESC;


--No of Admitted patient per ward per department

select dept_name, ward_num, Count(appointment_id) as Num_of_patients
from admit 
group by dept_name, ward_num;


--#Transactions and amount_transaction per day/month/year and for appointment booking with doctor, for lab_test, at pharmacy_store
select date_part('year',  timestamp_) as Year, count(*) as Num_of_transaction
from real_transaction
group by date_part('year',  timestamp_);

select date_part('year',  timestamp_) as Year, date_part('month',  timestamp_) as Month, count(*) as Num_of_transaction
from real_transaction
group by date_part('year',  timestamp_),date_part('month',  timestamp_);



select date_part('year',  timestamp_) as Year, sum(amount) as NET_Cash_flow
from real_transaction
group by date_part('year',  timestamp_);

select date_part('year',  timestamp_) as Year, date_part('month',  timestamp_) as Month, sum(amount) as NET_Cash_flow
from real_transaction
group by date_part('year',  timestamp_),date_part('month',  timestamp_);

--medicine demands

select M.id , count(*) as Quantity_sold
from prescribed_meds as PM join medicine as M on(PM.med_id = M.id)
group by M.id;





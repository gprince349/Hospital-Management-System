DROP TRIGGER IF EXISTS check_delayed on appointment;
DROP TRIGGER IF EXISTS check_test_delayed on test_appointment;

DROP TABLE IF EXISTS    test_appointment;                  
DROP TABLE IF EXISTS    prescribed_meds;                
DROP TABLE IF EXISTS    prescribed_tests;                
DROP TABLE IF EXISTS    medicine;                
DROP TABLE IF EXISTS    test;                
DROP TABLE IF EXISTS    prescription;                
DROP TABLE IF EXISTS    admit;                
DROP TABLE IF EXISTS    real_transaction;                
DROP TABLE IF EXISTS    wallet_transaction;
DROP TABLE IF EXISTS    appointment;                
DROP TABLE IF EXISTS    bed;                
DROP TABLE IF EXISTS    doctor;                
DROP TABLE IF EXISTS    admin;                
DROP TABLE IF EXISTS    director;                
DROP TABLE IF EXISTS    pharmacy_keeper;                
DROP TABLE IF EXISTS    pathologist;                
DROP TABLE IF EXISTS    accountant;                 
DROP TABLE IF EXISTS    nurse;                
DROP TABLE IF EXISTS    staff;                
DROP TABLE IF EXISTS    patient;                
DROP TABLE IF EXISTS    lab;                
DROP TABLE IF EXISTS    ward;                   
DROP TABLE IF EXISTS    department;                
DROP TABLE IF EXISTS    slot_interval;                
DROP TABLE IF EXISTS    slot;     

-- ================================================
--  		 Trigger to set id_serial
-- 		(on manual input value for id) as max()
-- ================================================

CREATE OR REPLACE FUNCTION set_serial_id_seq()
RETURNS trigger AS
$BODY$
  BEGIN
   EXECUTE (FORMAT('SELECT setval(''%s_%s_seq'', (SELECT MAX(%s) from %s));',
   TG_TABLE_NAME,
   TG_ARGV[0],
   TG_ARGV[0],
   TG_TABLE_NAME));
    RETURN OLD;
   END;
$BODY$
LANGUAGE plpgsql;  
-- ================================================


-- 1
CREATE TABLE slot (
        name					text,
        Primary key (name)
);

-- 2
CREATE TABLE slot_interval ( 
        name		            text,
        day		            	integer	check(day >=0 and day < 7),
        start_time		    	time,
        end_time		    	time   Not null,
        Primary key(name, day, start_time),
        Foreign key(name) references slot(name) on delete Cascade
);
-- 3
CREATE TABLE lab(
        id			        	serial,
        name			        text    Not null,
        address		         	text    Not null,
        appoints_per_slot	   	integer	Not Null 	check(appoints_per_slot >= 0 ),
        slot_name		        text    Not null,
        Primary key(id),
        Foreign key (slot_name) references slot
);
-- ================================================
CREATE TRIGGER set_lab_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON lab
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================

-- 4
CREATE TABLE department ( 
        name		            text,
        Primary key (name)
);

-- 5
CREATE TABLE ward (
        dept_name               text,
        ward_num	            integer,    
        type		            text 	Not null 	check (type in ('General', 'ICU')),
        charge_per_day	        integer Not null	check(charge_per_day >= 0 ),
        Primary key (dept_name,ward_num),
        Foreign key(dept_name) references department(name)
);
-- 6
CREATE TABLE patient (
        id		                serial,
        name 		            text,
        dob 		            date	Not Null,
        phone  		            text	Not Null 	Unique,
        passwd_hash				text 	Not null,
		account_info 	        text,
        balance 	            integer	Not null	check (balance >= 0 ) Default 0,
        gender 	                text	Not null	Check (gender in('male','female','other')),
		address 	            text,
		district				text,
		state					text,
		country					text,
        height		            integer	check (height > 0 or height is null ) ,
        weight		            integer	check (weight > 0 or weight is null),
        
		
        Primary Key(id)
);
-- ================================================
CREATE TRIGGER set_patient_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON patient
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================

-- 7
CREATE TABLE staff (
        id                  	serial,
        name                	text    NOT NULL,
		type 					text	Not Null,
        gender              	text	Not null Check (gender in('male','female','other')),
        date_of_joining 		date    NOT NULL,
        date_of_leave   		date,	/*(null allowed => currently working)*/
        dob 		        	date	Not null,
        salary 		        	integer	Not null	check (salary >= 0),

        phone 		        	text	NOT NULL UNIQUE,
		passwd_hash				text	Not null,
        address 	        	text,
        slot_name	        	text,
        Primary Key(id),
        Foreign Key(slot_name) references slot(name)
);
-- ================================================
CREATE TRIGGER set_staff_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON staff
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================

-- 8
CREATE TABLE accountant (	
        id		            	integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete Cascade
);

-- 9
CREATE TABLE nurse (	
        id		            	integer,
        dept_name		        text,
        ward_num	        	integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete Cascade,
        Foreign Key(dept_name, ward_num) references ward(dept_name,ward_num)
);

-- 10
CREATE TABLE pathologist (	
        id		                    integer,
        lab_id		                integer,
        Primary key(id),
        Foreign Key(id) references staff on delete Cascade,
        Foreign Key(lab_id) references lab(id)
);

-- 11
CREATE TABLE pharmacy_keeper (
        id		                    integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete Cascade
);
-- 12
CREATE TABLE director (	
        id		                    integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete Cascade
);
-- 13
CREATE TABLE admin (	
        id		                    integer,
        Primary key(id),
        Foreign Key(id) references staff on delete Cascade
);
-- 14
CREATE TABLE  doctor(	
        id		                integer,
        dept_name		        text,
        fee		                integer	Not null	check (fee >= 0),
        room_no	                integer ,
        appoints_per_slot 	    integer Not null	check(appoints_per_slot >=0 ),
        Primary key(id),
        Foreign key(id) references staff on delete Cascade,
        Foreign key(dept_name) references department(name)
);


-- 15
CREATE TABLE bed (
        dept_name		        text,
        ward_num	            integer,
        bed_num	                integer,
        Primary key (dept_name,ward_num,bed_num),
        Foreign Key(dept_name, ward_num) references ward(dept_name, ward_num) on delete Cascade
);


-- 16
CREATE TABLE appointment(
        id			            serial,
        timestamp_			    timestamp without time zone		Default current_timestamp,
        date_appoint		    date 	Not Null,
        status		            text	Not Null check(status in ('scheduled', 'complete', 'delayed', 'cancelled by doctor', 'cancelled')),
        doctor_id	            integer	Not null,
        patient_id	            integer	Not null,
        slot_name	            text	Not null,
        slot_day	            integer	Not null,
        start_time		        time without time zone	Not null,
        end_time 		        time without time zone,

        Primary key(id),
        Foreign Key(doctor_id) references doctor,
        Foreign Key(patient_id) references patient,
        Foreign Key(slot_name, slot_day, start_time) references slot_interval(name,day,start_time) on delete set Null
);
-- ================================================
CREATE TRIGGER set_appointment_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON appointment
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================

-- 17
CREATE TABLE wallet_transaction ( 
        id 		                 serial,
        patient_id 	             integer,
        amount		             integer	NOT NULL,
        service 	             text		Not Null,
        timestamp_	             timestamp without time zone	Default current_timestamp,
        Primary Key(id),
        Foreign Key(patient_id) references patient on delete set Null
);
-- ================================================
CREATE TRIGGER set_wallet_transaction_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON wallet_transaction
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================

-- 18
CREATE TABLE real_transaction (
        id 		                 serial,
        accountant_id	         integer,
        patient_id          	 integer,
        amount		             integer 	Not Null,
        timestamp_	             timestamp without time zone 	Default current_timestamp,
        Primary key(id),
        Foreign Key(patient_id) references patient on delete set Null,
        Foreign Key(accountant_id) references accountant(id) on delete set Null
);
-- ================================================
CREATE TRIGGER set_real_transaction_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON real_transaction
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================

-- 19
CREATE TABLE admit (
        appointment_id          integer,
        dept_name               text,
        ward_num                integer,
        bed_num                 integer,
        time_admit              timestamp without time zone		Default current_timestamp,
        time_discharge          timestamp without time zone,
        total_bill              integer 	check(total_bill>=0),
        Primary key(appointment_id),
        Foreign Key(appointment_id) references appointment on delete set NULL,
        Foreign Key(dept_name,ward_num, bed_num) references bed on delete set Null,
		Check (time_discharge is not null OR (dept_name is not null AND ward_num is not null AND bed_num is not null))
		-- make sure that if patient is not discharged then bed should exist
);

-- 20
CREATE TABLE prescription(
        appointment_id		    integer,
	diagnosis				text 	Not null,
        remarks		            text,
        Primary key(appointment_id),
	Foreign key(appointment_id) references appointment on delete Cascade
);


-- 21
CREATE TABLE test (
        test_id		            integer,
        lab_id  		        integer		Not Null,
        test_name	            text		Not null,
        test_fee	            integer 	Not null	check (test_fee >= 0 ),
		description				text,
        Primary key(test_id),
        Foreign Key(lab_id) references lab
);

-- 22
CREATE TABLE medicine (
        id		                serial,
        name		            text		Not null,
        price		            integer 	Not null	check(price >=0 ),
        company	                text		Not null,
        available_quantity	    integer		Not null	check(available_quantity >= 0 ),
        Primary key(id)
);
-- ================================================
CREATE TRIGGER set_medicine_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON medicine
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================

-- 23
CREATE TABLE prescribed_tests (
        prescription_id		    integer,
        test_id			        integer,
        Primary key(prescription_id,test_id),
        Foreign Key(prescription_id) references prescription on delete Cascade,
        Foreign Key(test_id) references Test on delete set Null
);

-- 24
CREATE TABLE prescribed_meds (
        prescription_id		    integer,
        med_id			        integer,
        dose_per_day	    	integer 	check(dose_per_day >= 0 OR dose_per_day is null),
        duration		        integer		check(duration >= 0 OR duration is null),
        Primary key(prescription_id,med_id),
        Foreign Key(prescription_id) references prescription on delete Cascade,
        Foreign Key(med_id) references medicine on delete set Null
);

-- 25
CREATE TABLE test_appointment (
        id		                serial,
        test_id		            integer		Not null,
        timestamp_	            timestamp without time zone	Default current_timestamp,
        pathologist_id          integer,
        patient_id          	integer		Not null,
        slot_name	            text		Not null,
        slot_day		                integer		Not null,
        start_time	            time without time zone,
        end_time	            time without time zone,
        date_appoint		    date		Not null,
        status		            text 	Not null check(status in ('scheduled', 'sample_taken', 'complete', 'delayed', 'cancelled', 'cancelled by pathologist')),
        result                  text,  			/*null while result not published*/

        Primary key(id),
        Foreign Key(test_id) references Test,
        Foreign Key(patient_id) references patient,
        Foreign Key(pathologist_id) references pathologist,
        Foreign Key(slot_name,slot_day,start_time) references slot_interval(name,day,start_time) on delete set Null
);
-- ================================================
CREATE TRIGGER set_test_appointment_id_seq
AFTER INSERT OR UPDATE OR DELETE
ON test_appointment
FOR EACH STATEMENT
  EXECUTE PROCEDURE  set_serial_id_seq('id');
-- ================================================



-- ================== Indexes =====================
Create index doct_appointment 		on appointment USING btree (doctor_id);
Create index patient_appointment 	on appointment USING btree (patient_id);
Create index date_appointment 		on appointment USING btree (date_appoint);
Create index st_appointment 		on appointment USING btree (status);

Create index patho_test_appointment on test_appointment USING btree (pathologist_id);
Create index patient_test_appointment on test_appointment USING btree (patient_id);
Create index date_test_appointment 	on test_appointment USING btree (date_appoint);
Create index st_test_appointment 	  on test_appointment USING btree (status);



-- ================== Triggers =====================
-- trigger to check for any delayed appointment
-- before any INSERT/UPDATE/DELETE
CREATE OR replace FUNCTION check_appoint_delayed()
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   -- trigger logic
    update appointment set status = 'delayed'
    where status = 'scheduled'
    and (date_appoint < current_date) OR (date_appoint = current_date and end_time < current_time);
    return new;
END;
$$;

create trigger check_delayed AFTER insert OR update OR delete
on appointment
for each statement
when (pg_trigger_depth() = 0)
execute procedure check_appoint_delayed();


-- trigger to check for any delayed test_appointment
-- before any INSERT/UPDATE/DELETE
CREATE OR replace FUNCTION check_test_appoint_delayed() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   -- trigger logic
    update test_appointment set status = 'delayed'
    where status = 'scheduled' 
    and (date_appoint < current_date) OR (date_appoint = current_date and end_time < current_time);
    return new;
END;
$$;

create trigger check_test_delayed AFTER insert OR update OR delete
on test_appointment
for each statement
when (pg_trigger_depth() = 0)
execute procedure check_test_appoint_delayed();



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
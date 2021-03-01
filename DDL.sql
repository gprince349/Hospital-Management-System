DROP TABLE IF EXISTS    test_report;
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


CREATE TABLE slot (
        name		            text,
        Primary key (name)
);

CREATE TABLE slot_interval ( 
        name		            text,
        day		                text,
        start_time		        time,
        end_time		        time,
        Primary key(name, day, start_time),
        Foreign key(name) references slot(name) on delete set Null
);

CREATE TABLE lab(
        id			            integer,
        name			        text,
        address		            text,
        appoints_per_slot	    integer check(appoints_per_slot >= 0 ),
        slot_name		        text,
        Primary key(id),
        Foreign key (slot_name) references slot on delete set null
);

CREATE TABLE department ( 
        id		                integer,
        name		            text,
        Primary key (id)
);


CREATE TABLE ward (
        dept_id		            integer,
        ward_num	            integer,    
        type		            text check (type in ('general', 'ICU')),
        charge_per_day	        integer check(charge_per_day >= 0 ),
        Primary key (dept_id,ward_num),
        Foreign key(dept_id) references department(id) on delete set Null
);

CREATE TABLE patient (
        id		                integer,
        name 		            text,
        dob 		            date	Not Null,
        phone  		            text	Not Null Unique,
        address 	            text,
        account_info 	        text,
        balance 	            integer	check (balance >= 0 ),
        gender 	                text	Check(gender in('Male','Female'))	,
        height		            integer	check (height > 0 or height is null ) ,
        weight		            integer	check (weight > 0 or weight is null),
        Primary Key(id)
);


CREATE TABLE staff (
        id                  integer NOT NULL,
        name                text    NOT NULL,
        gender              text,
        date_of_joining 	date    NOT NULL,
        date_of_leave   	date,	/*(null allowed => currently working)*/
        dob 		        date,
        salary 		        integer	check (salary >= 0),
        phone 		        text	NOT NULL UNIQUE,
        address 	        text,
        slot_name	        text,
        Primary Key(id),
        Foreign Key(slot_name) references slot(name) on delete set Null
);


CREATE TABLE accountant (	
        id		            integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete set Null
);


CREATE TABLE nurse (	
        id		            integer,
        dept_id		        integer,
        ward_num	        integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete set Null,
        Foreign Key(dept_id, ward_num) references ward(dept_id,ward_num) on delete set Null
);


CREATE TABLE pathologist (	
        id		                    integer,
        lab_id		                integer,
        Primary key(id),
        Foreign Key(id) references staff on delete set Null,
        Foreign Key(lab_id) references lab(id) on delete set Null
);


CREATE TABLE pharmacy_keeper (	
        id		                    integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete set Null
);

CREATE TABLE director (	
        id		                    integer,
        Primary key(id),
        Foreign Key(id) references staff(id) on delete set Null
);

CREATE TABLE admin (	
        id		                    integer,
        Primary key(id),
        Foreign Key(id) references staff on delete set Null
);

CREATE TABLE  doctor(	
        id		                integer,
        dept_id		            integer,
        fee		                integer	check (fee >= 0),
        room_no	                integer ,
        appoints_per_slot 	    integer check(appoints_per_slot >=0 ),
        Primary key(id),
        Foreign key(id) references staff on delete set Null,
        Foreign key(dept_id) references department(id) on delete set Null
);




CREATE TABLE bed (
        dept_id		            integer,
        ward_num	            integer,
        bed_num	                integer,
        Primary key (dept_id,ward_num,bed_num),
        Foreign Key(dept_id, ward_num) references ward(dept_id, ward_num) on delete set Null
);



CREATE TABLE appointment(
        id			            integer,
        timestamp_booking	    timestamp without time zone	Not Null,
        date_appoint		    date 		Not Null,
        status		            text	Not Null,
        doctor_id	            integer,
        patient_id	            integer,
        slot_name	            text,
        slot_day	            text,
        start_time		        time without time zone,
        end_time 		        time without time zone,

        Primary key(id),
        Foreign Key(doctor_id) references doctor on delete set Null,
        Foreign Key(patient_id) references patient on delete set Null,
        Foreign Key(slot_name, slot_day, start_time) references slot_interval(name,day,start_time) on delete set Null
);



CREATE TABLE wallet_transaction ( 
        id 		                 integer,
        patient_id 	             integer		Not Null,
        amount		             integer check (amount >= 0) NOT NULL,
        service 	             text		Not Null,
        timestamp	             timestamp without time zone	Not Null,
        Primary Key(id),
        Foreign Key(patient_id) references patient on delete set Null
);


CREATE TABLE real_transaction (
        id 		                 integer,
        accountant_id	         integer,
        patient_id          	 integer Not Null,
        amount		             integer check (amount >=0 ) Not NULL,
        time_stamp	             timestamp without time zone Not Null,
        Primary key(id),
        Foreign Key(patient_id) references patient on delete set Null,
        Foreign Key(accountant_id) references accountant(id) on delete set Null
);

CREATE TABLE admit (
        appointment_id          integer,
        dept_id                 integer,
        ward_num                integer,
        bed_num                 integer,
        time_admit              timestamp without time zone,
        time_discharge          timestamp without time zone,
        total_bill              integer check(total_bill>=0),
        Primary key(appointment_id),
        Foreign Key(appointment_id) references appointment on delete set Null,
        Foreign Key(dept_id,ward_num, bed_Num) references bed on delete set Null
);


CREATE TABLE prescription(
        appointment_id		    integer,
        remarks		            text,
        Primary key(appointment_id)
);




CREATE TABLE test (
        test_id		            integer,
        lab_id  		        integer	Not Null,
        test_name	            text,
        test_fee	            integer check (test_fee >= 0 ),
        Primary key(test_id),
        Foreign Key(lab_id) references lab on delete set Null
);


CREATE TABLE medicine (
        id		                integer,
        name		            text,
        price		            integer check(price >=0 ),
        company	                text,
        available_quantity	    integer	check(available_quantity >= 0 ),
        Primary key(id)
);

CREATE TABLE prescribed_tests (
        prescription_id		    integer,
        test_id			        integer,
        Primary key(prescription_id,test_id),
        Foreign Key(prescription_id) references prescription on delete set Null,
        Foreign Key(test_id) references Test on delete set Null
);


CREATE TABLE prescribed_meds (
        prescription_id		    integer,
        med_id			        integer,
        Dose_per_day	    	integer,
        Duration		        integer,
        Primary key(prescription_id,med_id),
        Foreign Key(prescription_id) references prescription on delete set Null,
        Foreign Key(med_id) references medicine on delete set Null
);



CREATE TABLE test_appointment (
        id		                integer,
        test_id		            integer,
        result                  text,  /*null while result not published*/
        pathologist_id          integer,
        patient_id          	integer,
        slot_name	            text,
        day		                text,
        start_time	            time without time zone,
        date		            date,
        timestamp	            timestamp without time zone,
        status		            text,
        Primary key(id),
        Foreign Key(test_id) references Test on delete set Null,
        /*Foreign Key(test_report_id) references Test_report on delete set Null,*/
        Foreign Key(patient_id) references patient on delete set Null,
        Foreign Key(pathologist_id) references patient on delete set Null,
        Foreign Key(slot_name,day,start_time) references slot_interval(name,day,start_time) on delete set Null
);


/* why many to one */

/*
CREATE TABLE test_report (
        report_id		        integer,
        pathologist_id		    integer,
        test_appoint_id		    integer,
        result			        text,
        Primary key(report_id),
        Foreign Key(pathologist_id) references pathologist on delete set Null,
        Foreign Key(test_appoint_id) references test_appointment on delete set Null
);*/



 



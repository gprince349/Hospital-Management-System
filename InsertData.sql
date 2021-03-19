delete from test_appointment;   
delete from prescribed_meds;    
delete from prescribed_tests;   
delete from medicine;           
delete from test;               
delete from prescription;       
delete from admit;              
delete from real_transaction;   
delete from   wallet_transaction;
delete from appointment;        
delete from bed;                
delete from doctor;             
delete from admin;              
delete from director;           
delete from pharmacy_keeper;    
delete from pathologist;        
delete from accountant;         
delete from nurse;              
delete from staff;              
delete from patient;            
delete from lab;                
delete from ward;               
delete from department;         
delete from slot_interval;      
delete from slot;               


\set localpath `pwd`'/data/slot.csv'
copy slot from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/slot_interval.csv'
copy slot_interval from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/department.csv'
copy department from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/ward.csv'
copy ward from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/lab.csv'
copy lab from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/patient.csv'
copy patient from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/staff.csv'
copy staff from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/nurse.csv'
copy nurse from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/accountant.csv'
copy accountant from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/pathologist.csv'
copy pathologist from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/pharmacy_keeper.csv'
copy pharmacy_keeper from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/director.csv'
copy director from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/admin.csv'
copy admin from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/doctor.csv'
copy doctor from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/bed.csv'
copy bed from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/appointment.csv'
copy appointment from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/wallet_transaction.csv'
copy wallet_transaction from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/real_transaction.csv'
copy real_transaction from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/admit.csv'
copy admit from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/prescription.csv'
copy prescription from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/test.csv'
copy test from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/medicine.csv'
copy medicine from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/prescribed_tests.csv'
copy prescribed_tests from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/prescribed_meds.csv'
copy prescribed_meds from :'localpath' delimiter ',' csv header NULL 'NULL';

\set localpath `pwd`'/data/test_appointment.csv'
copy test_appointment from :'localpath' delimiter ',' csv header NULL 'NULL';


const pool = require("../utils/database");
const { Real_transaction, Wallet_transaction } = require("./trans");
Appointment, Test_appointment, Prescription = require('../models/appoint.js')
Real_transaction, Wallet_transaction = require('../models/trans.js')


class Staff{
    constructor(id,name, type, gender, date_of_join, date_of_leave, dob, 		      
        salary, phone, passwd_hash, address, slot_name){

            this.id            = id;      
            this.name          = name;        
            this.type          = type;					t
            this.gender        = gender;   
            this.date_of_join  = date_of_join;
            this.date_of_leave = date_of_leave;
            this.dob           = dob 		  ; 		      
            this.salary        = salary 	; 		   
            this.phone         = phone 		; 		    
            this.passwd_hash   = passwd_hash;
            this.address       = address 	 ; 	   
            this.slot_name     = slot_name	;	  
    }

    add_staff(){
        var sql = 'INSERT INTO staff VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);'
        var values = [this.id, this.name, this.type, this.gender, this.date_of_join, this.date_of_leave,
            this.dob, this.salary, this.phone, this.passwd_hash, this.address, this.slot_name];

            
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////

    /// FOR LOGIN
    static get_staff(phone, passwd_hash){
        var sql = 'Select * from staff where phone=$1 and passwd_hash=$2';
        var values = [phone, passwd_hash];

        return pool.query(sql, values)
    }

    
};


class Doctor{
    constructor(id,dept_name, fee, room_no, appoints_per_slot){
            this.id          = id;
            this.dept_name   = dept_name;
            this.fee         = fee;
            this.room_no     = room_no;
            this.appoints_per_slot           = appoints_per_slot;
    }

    add_doctor(){
        var sql = 'INSERT INTO doctor VALUES ($1, $2, $3, $4, $5);';
        var values = [this.id, this.dept_name, this.fee, this.room_no, this.appoints_per_slot];

        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)})
    }

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////

    //// SEE appointment
    static see_appointment(doc_id){
        var sql = 'SELECT * from appointment where doctor_id = $1;'
        var values = [doc_id];

        return pool.query(sql,values)
    }

    static see_appointment_datewise(doc_id, date){
        var sql = 'SELECT * from appointment where doctor_id = $1 and date=$2;';
        var values = [doc_id,date];

        return pool.query(sql,values)
    }

    static see_appointment_patient(doc_id, patient_id){
        var sql = 'SELECT * from appointment where doctor_id = $1 and patient_id=$2;';
        var values = [doc_id,patient_id];

        return pool.query(sql,values)
    }

    ///Cancelling appointment
    static cancel_appointment(appoint_id, patient_id, fee){
        const sql = `BEGIN; \
        Update appointment  \
        Set status = “cancelled by doctor” \
        Where id = $1; \

        update patient set balance = balance + $3 where id = $2; \

        Insert into wallet_transaction (patient_id, amount, service) \
        values ($2, $3, 'refund due to cancellation by doctor'); \
        COMMIT;`

        var values = [appoint_id, patient_id, fee];
        return pool.query(sql, values)
    }

    //Complete appointment
    static complete_appointment(appoint_id){
        var sql = 'Update appointment set status = ‘complete’ Where id = $1;'
        var values = [appoint_id];

        return pool.query(sql, values)
    }

    //Write prescription
    static write_prescription(appoint_id, diagnosis, remark){

        const pres = new Prescription(appoint_id, diagnosis, remark)
        return pres.add_prescription()
    }

    //Write Medicine
    static write_medicine(pres_id, med_id, dosage_per_day, duration){
        const sql = 'INSERT INTO prescribed_meds($1, $2, $3, $4);'
        var values = [pres_id, med_id, dosage_per_day, duration]

        return pool.query(sql, values);
    }

    //Write test
    static write_test(pres_id, test_id){
        const sql = 'INSERT INTO prescribed_tests($1, $2);'
        var values = [pres_id, test_id]

        return pool.query(sql, values);

    }

    //Update prescription
    static update_prescription(pres_id,changed_diag,updated_remarks){
        const sql = 'UPDATE prescription SET diagnosis = $1, remarks = $2 WHERE appointment_id = $3;'
        var values = [changed_diag,updated_remarks,pres_id]

        return pool.query(sql, values)
    }
    
    //Update pres_meds
    static update_medicine(pres_id, new_med_id, dosage_per_day, new_duration){
        const sql = 'UPDATE prescribed_meds \
                    SET med_id = $2, \
                    dose_per_day = $3, \
                    duration = $4 \
                    WHERE appointment_id = $1 '

        var values = [pres_id, new_med_id, dosage_per_day, new_duration]

        return pool.query(sql, values);
    }

    //Update pres_tests
    static update_test(pres_id, new_test_id){
        const sql = 'UPDATE prescribed_tests \
                    SET med_id = $2, \
                    WHERE appointment_id = $1 '

        var values = [pres_id, new_test_id]
        return pool.query(sql, values);
    }


    //SEE prescriptions meds tests details 
    // returns three data data
    static get_prescription(appoint_id){
        const sql1 = 'Select * from prescription Where appointment_id = $1;';

        const sql2 = 'With R as (Select * from prescribed_meds Where prescription_id = $1;) \
                      SELECT * from R join medicine as M on(R.med_id = M.id)'


        const sql2 = 'With R as (Select * from prescribed_tests Where prescription_id = $1;) \
                        SELECT * from R join test as T on(R.test_id = T.id)'


        var values = [appoint_id]

        var pres_details = pool.query(sql1, values)
        var meds_list = pool.query(sql2, values)
        var test_list = pool.query(sql3, values)

        return [pres_details, meds_list, test_list]

    }

    // SEE test reports
    static get_report(patient_id){
        const sql = 'SELECT * from test_appointment where patient_id = $1';
        var values = [patient_id]

        return pool.query(sql,values)
    }

};


class Pathologist{
    constructor(id, lab_id){
             this.id = id;
             this.lab_id = lab_id;
    }
 
     add_pathologist(){
         var sql = 'INSERT INTO pathologist VALUES ($1, $2);';
         
         var values = [this.id, this.lab_id];
         
         pool.query(sql,values)
         .then( res => {
             console.log(res);
         })
         .catch( err => { console.log(err)})
     };
 
     get_all(){
         var sql = 'Select * from pathologist ;';
 
         pool.query(sql, (err,res)=>{
             console.log(err,res.rows);
         })
     };

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////

     
 };

class Nurse{
    constructor(id, dept_name, ward_num){
             this.id = id;
             this.dept_name = dept_name;
             this.ward_num = ward_num;
    }
 
     add_nurse(){
         var sql = 'INSERT INTO nurse VALUES ($1, $2, $3);';
         
         var values = [this.id, this.dept_name, this.ward_num];
         pool.query(sql,values)
         .then( res => {
             console.log(res);
         })
         .catch( err => { console.log(err)})
     }
 
     get_all(){
         var sql = 'Select * from nurse ;';
 
         pool.query(sql, (err,res)=>{
             console.log(err,res.rows);
         })
 
     }
 };


class Accountant{
    constructor(id){
             this.id = id;
    }
 
     add_accountant(){
         var sql = 'INSERT INTO accountant VALUES ($1);';
         
         var values = [this.id];

         pool.query(sql,values)
         .then( res => {
             console.log(res);
         })
         .catch( err => { console.log(err)})
     };
 
     get_all(){
         var sql = 'Select * from accountant;';
 
         pool.query(sql, (err,res)=>{
             console.log(err,res.rows);
         })
     };

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////
     //add money to patient wallet

     static add_money(id, accountant_id, patient_id, amount){
            const trans = new Real_transaction(id, accountant_id, patient_id, amount);
            return trans.add_real_transaction();
     }

     //give back money from wallet
     static return_money(id, accountant_id, patient_id, amount){
        const trans = new Real_transaction(id, accountant_id, patient_id, amount);
        return trans.add_real_transaction();
    }

 };



 

 module.exports = {Staff, Doctor, Pathologist, Nurse}
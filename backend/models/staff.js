const pool = require("../utils/database");
const Medicine = require("./medicine");
const { Real_transaction, Wallet_transaction } = require("./trans");

class Staff{
    constructor(name, type, gender, date_of_join, date_of_leave, dob, 		      
        salary, phone, passwd_hash, address, slot_name){

            this.name          = name;
            this.type          = type;
            this.gender        = gender;
            this.date_of_join  = date_of_join;
            this.date_of_leave = date_of_leave;
            this.dob           = dob;
            this.salary        = salary;
            this.phone         = phone;
            this.passwd_hash   = passwd_hash;
            this.address       = address;
            this.slot_name     = slot_name
    }

    add_staff(){
        var sql = 'INSERT INTO staff (name, type, gender, date_of_joining, date_of_leave, dob, salary, phone, passwd_hash, address, slot_name)Values ($1,$2, $3,$4,$5,$6,$7,$8,$9,$10,$11);'
        var values = [ this.name, this.type, this.gender, this.date_of_join, this.date_of_leave,
            this.dob, this.salary, this.phone, this.passwd_hash, this.address, this.slot_name];

        return pool.query(sql,values)
       
    }

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////

    /// FOR LOGIN
    static get_staff(phone){
        var sql = 'Select * from staff where phone=$1';
        var values = [phone];

        return pool.query(sql, values)
    }

    static get_staff_info(id){
        var sql = 'Select * from staff where id=$1';
        var values = [id];

        return pool.query(sql, values)
    }

    static update_details(ID, name, address){
        const sql = "UPDATE staff SET (name, address) = ($2,$3)\
                    WHERE ID = $1";
        const values = [ID, name, address];
        
        return pool.query(sql, values);
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
    //Get doctors list

    static get_doctor_list(){
        var sql = 'SELECT D.id,S.name, D.fee, D.dept_name from doctor as D join staff as S on(D.id = S.id)';
        return pool.query(sql)
    }

    static get_free_slot(d_id){
        var sql = "";
        return pool.query(sql)

    }
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
                \
                update patient set balance = balance + $3 where id = $2; \
                \
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


        const sql3 = 'With R as (Select * from prescribed_tests Where prescription_id = $1;) \
                        SELECT * from R join test as T on(R.test_id = T.id)'


        var values = [appoint_id]

        var pres_details = pool.query(sql1, values)
        var meds_list = pool.query(sql2, values)
        var test_list = pool.query(sql3, values)

        return [pres_details, meds_list, test_list]

    }

    static get_free_slots(id){
        const sql = 'with slots(slot_name, day, start_time, end_time) as(\
                            select * \
                            from slot_interval\
                            where name = (select slot_name from staff where id = $1)),\
                        slot_count(slot_name, day, start_time, count) as(\
                            select slot_name, slot_day, start_time , count(*)\
                            from appointment\
                            where date_appoint >= current_date and start_time > current_time\
                            and doctor_id = $1\
                            group by slot_name, slot_day, start_time)\
                    select slot_name, day, start_time, end_time, coalesce(count, 0) as bookings,\
                            (case when (day = extract(dow from current_date) and start_time < current_time)\
                                        then current_date + 7\
                                when (day = extract(dow from current_date) and start_time > current_time)\
                                        then current_date\
                                else current_date + MOD(cast(day - extract(dow from current_date) + 7 AS INTEGER), 7)\
                            end) as "date"\
                    from slots left outer join slot_count using(slot_name, day, start_time)\
                    where (count < (select appoints_per_slot from doctor where id = $1) OR count is null)\
                    order by date ASC;';
        var values = [id]
        return pool.query(sql, values);
    }
    // SEE test reports
    //method in test_appointment already

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

    /////////// STATIC METHODS FOR QUERYING DATABASE ///////////////////////

    //Access prescription and previous reports of patient
     //get prescription details
     static get_prescription(pat_id){
     
        sql = 'SELECT * FROM appointment as A \
        JOIN prescription as P ON (A.id = P.appointment_id) \
        WHERE patient_id = $1'

        values = [pat_id]
        return pool.query(sql,values)
     }
    
    // SEE test reports
    //method in test_appointment already

    //Take Sample
    static take_sample(appoint_id){
        sql = 'Update test_appointment \
                Set status = “sample_taken” \
                Where id = $1;'
        values = [appoint_id]

        return pool.query(sql, values)
    }

    //Add report to patient’s account
    static add_report(path_of_result,appoint_id){
        sql = 'Update test_appointment \
            Set result = $1, \
            status = “complete” \
            Where id = $2;'
        
        values = [path_of_result, appoint_id]
        
        return pool.query(sql,values)
    }

    //cancel test_appointment ??????????? transaction id doubt?
    static cancel_appointment(appoint_id, fee, pat_id){
        sql = 'BEGIN; \
            Update test_appointment Set status = “cancelled by pathologist” \
            Where id = $1; \
                            \
            Update patient set balance = balance + $2 where id = $3; \
                            \
            Insert into wallet_transaction (patient_id, amount, service) \
            values ($3, $2, "refund due to cancellation by pathologist"); \
            COMMIT;'
        values = [appoint_id, fee, pat_id]

        return pool.query(sql,values)
    }
    
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

 class Admin{
    constructor(id){
                this.id = id;
    }

    add_admin(){
        var sql = 'INSERT INTO admin VALUES ($1);';
        
        var values = [this.id];

        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)})
    };
}

 class Pharmacy_keeper{
    constructor(id){
             this.id = id;
    }

    add_pharmacy_keeper(){
        var sql = 'INSERT INTO pharmacy_keeper VALUES ($1);';
        
        var values = [this.id];

        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)})
    };


    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////

    //Insert medicine
    static add_medicine(id, name, price, company, available_quantity){
        var med = new Medicine(id, name, price, company, available_quantity)
        return med.add_medicine()
    }
    //Updating the medicine entity for the new supply
    static update_medicine(id, name, price, company, available_quantity){
        const sql = 'UPDATE medicine \
            SET available_quantity = $5, name = $2, price = $3, company=$4 \
            WHERE id = $1'
        var values = [id, name, price, company, available_quantity]

        return pool.query(sql,values)
    }

    //checkavailability already method in medicine class


    //Make payment and deduct money from patient’s wallet
    static make_payment(pat_id,amount){
        amount = -1*amount //?????????????????check what are you passing
        const sql = 'BEGIN; \
                    update patient set balance = balance - $2 \
                    where id = $1; \
                    Insert into wallet_transaction (patient_id, amount, service) \
                    values ($1, $2, "payment made at pharmacy"); \
                    COMMIT;'
        values = [pat_id, amount]
        return pool.query(sql,values)
    }

 };

 class Director{
        constructor(id){
            this.id = id;
    }

    add_director(){
    var sql = 'INSERT INTO director VALUES ($1);';
    var values = [this.id];

    pool.query(sql,values)
    .then( res => {
        console.log(res);
    })
    .catch( err => { console.log(err)})
    };

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////
    //recruit staff
    static add_staff(name, type, gender, date_of_join, date_of_leave,
        dob,salary, phone, passwd_hash, address, slot_name){
        var new_staff = new Staff(name, type, gender, date_of_join, date_of_leave,
             dob,salary, phone, passwd_hash, address, slot_name)
        return new_staff.add_staff();
    }

    static add_admin(){
            
    }


 };

 module.exports = {Staff, Doctor, Pathologist, Nurse, Accountant, Pharmacy_keeper, Director, Admin}
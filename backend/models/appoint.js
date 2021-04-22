const pool = require('../utils/database')


class Appointment{
    constructor(id, timestamp_, date_appoint, status, doctor_id,
         patient_id, slot_name, slot_day, start_time, end_time){
            this.id   = id;
            this.timestamp_   = timestamp_;
            this.date_appoint   = date_appoint;
            this.status   = status;
            this.doctor_id   = doctor_id;
            this.patient_id   = patient_id;
            this.slot_name   = slot_name;
            this.slot_day   = slot_day;
            this.start_time   = start_time;
            this.end_time   = end_time;
    }

    add_appointment(){
        var sql = 'INSERT INTO appointment VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);'
        var values = [this.id,this.timestamp_,this.date_appoint,this.status,this.doctor_id,
            this.patient_id,this.slot_name,this.slot_day,this.start_time,this.end_time];

        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }
};


class Test_appointment{
    constructor(id, test_id, timestamp_, pathologist_id, patient_id, slot_name,
         slot_day, start_time, end_time, date_appoint, status, result){
                this.id = id;
                this.test_id = test_id;
                this.timestamp_ = timestamp_;
                this.pathologist_id = pathologist_id;
                this.patient_id = patient_id;
                this.slot_name = slot_name;
                this.slot_day = slot_day;
                this.start_time = start_time;
                this.end_time = end_time;
                this.date_appoint = date_appoint;
                this.status = status;
                this.result = result;
    }


    add_test_appointment(){
        var sql = 'INSERT INTO test_appointment VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);'
        var values = [this.id, this.test_id, this.timestamp_, this.pathologist_id, this.patient_id, 
            this.slot_name, this.slot_day, this.start_time, this.end_time, this.date_appoint, this.status, this.result];

        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////

    static get_report(patient_id){
        const sql = 'SELECT * from test_appointment where patient_id = $1';
        var values = [patient_id]

        return pool.query(sql,values)
    }

};

class Prescription{
        constructor(appointment_id, diagnosis, remarks){
            this.appointment_id= appointment_id;
            this.diagnosis= diagnosis;
            this.remarks= remarks;
        }   

        add_prescription(){
            var sql = 'INSERT INTO prescription VALUES($1,$2,$3);'
            var values = [this.appointment_id, this.diagnosis, this.remarks];

        return pool.query(sql,values)
            // .then( res => {
            //     console.log(res);
            // })
            // .catch( err => { console.log(err)});
        }

};

module.exports = {Appointment, Test_appointment, Prescription}
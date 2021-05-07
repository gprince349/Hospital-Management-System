let file = __filename.slice(__dirname.length + 1);
const { Staff, Doctor } = require("../models/staff")

const CONST = require("../utils/constants")

exports.get_freeslot = async (req, res) => {
    try{
        let docid = req.params.id;
        let slots = await Doctor.get_free_slots(docid);
        if(slots.rowCount > 0){
            slots.rows.forEach( r => r.dateStr = new Date(r.date).toDateString() );
            res.status(200).json(slots.rows);
        }else{
            throw Error("No free slot available");
        }
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}


exports.get_appoints = async (req, res) => {
    try{
        if(res.locals.dtoken["type"] != CONST.doctorStr){
            throw Error("Only doctors can access this api");
        }
        var obj = await Doctor.see_appointment(req.body.doctor_id)
        res.status(200).json(obj.rows);

    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_markComplete = (req, res) => {
    try{
        var obj = Doctor.complete_appointment(req.body.id)
        obj.then(result=>{
            res.status(200).json({msg: "doctor markComplete success", result});
        })
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_cancelAppoint = (req, res) => {
    try{
        var obj = Doctor.cancel_appointment(req.body.appoint_id, req.body.patient_id, req.body.fee)
        obj.then(result => {
            res.status(200).json({msg: "doctor cancelAppoint success", result});
        })
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}


exports.post_addpresc = (req, res) => {
    try{
        var obj= Doctor.write_prescription(req.body.appoint_id, req.body.diagnosis, req.body.remark)
        obj.then(result=>{
            res.status(200).json({msg: "doctor add prescription success", result});

        })
        for (var med in req.body.medicine){
            const obj = req.body.medicine[med]

            var med_obj = Doctor.write_medicine(obj.pres_id, obj.med_id, obj.dosage_per_day, obj.duration)
            med_obj.then(result=>{
                res.status(200).json({msg: "doctor add medicine success", result});
            })
        }

        for(var test in req.body.test){
            const obj = req.body.test[test];
            var test_obj = Doctor.write_test(obj.pres_id, obj.test_id);
            test_obj.then(result=>{
                res.status(200).json({msg: "doctor added test success", result});
            })
        }


    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_modifypresc = (req, res) => {
    try{ var obj= Doctor.update_prescription(req.body.pres_id, req.body.diagnosis, req.body.remark)
        obj.then(result=>{
            res.status(200).json({msg: "doctor modify prescription success", result});
        })

        for (var med in req.body.medicine){
            const obj = req.body.medicine[med]

            var med_obj = Doctor.update_medicine(obj.pres_id, obj.med_id, obj.dosage_per_day, obj.duration)
            med_obj.then(result=>{
                res.status(200).json({msg: "doctor add medicine success", result});
            })
        }

        for(var test in req.body.test){
            const obj = req.body.test[test];
            var test_obj = Doctor.update_test(obj.pres_id, obj.test_id);
            test_obj.then(result=>{
                res.status(200).json({msg: "doctor updated test success", result});
            })
        }


    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

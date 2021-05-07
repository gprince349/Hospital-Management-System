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
        var obj = await Doctor.see_appointment(res.locals.dtoken["id"]);
        res.status(200).json(obj.rows);

    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_markComplete = async (req, res) => {
    try{
        var obj = await Doctor.complete_appointment(req.body.id)
        res.status(200).json({msg: "doctor markComplete success", data: obj.rows});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_cancelAppoint = async (req, res) => {
    try{
        var obj = await Doctor.cancel_appointment(req.body.appoint_id, req.body.patient_id, req.body.fee)
        res.status(200).json({msg: "doctor cancelAppoint success", data: obj.rows});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}


exports.post_addpresc = async (req, res) => {
    try{
        var obj= await Doctor.write_prescription(req.body.appoint_id, req.body.diagnosis, req.body.remark)

        for (var med in req.body.medicine){
            const obj = req.body.medicine[med]

            var med_obj = await Doctor.write_medicine(obj.pres_id, obj.med_id, obj.dosage_per_day, obj.duration)
        }

        for(var test in req.body.test){
            const obj = req.body.test[test];
            var test_obj = await Doctor.write_test(obj.pres_id, obj.test_id);
        }
        
        res.status(200).json({msg: "doctor addpresc success"});

    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_modifypresc = async (req, res) => {
    try{ var obj= await Doctor.update_prescription(req.body.pres_id, req.body.diagnosis, req.body.remark)

        for (var med in req.body.medicine){
            const obj = req.body.medicine[med]

            var med_obj = await Doctor.update_medicine(obj.pres_id, obj.med_id, obj.dosage_per_day, obj.duration)
        }

        for(var test in req.body.test){
            const obj = req.body.test[test];
            var test_obj = await Doctor.update_test(obj.pres_id, obj.test_id);
        }
        
        res.status(200).json({msg: "doctor updated test success", result});

    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

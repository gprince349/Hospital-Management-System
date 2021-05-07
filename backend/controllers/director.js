const { Director, Nurse, Doctor, Pathologist } = require("../models/staff");

let file = __filename.slice(__dirname.length + 1);

exports.post_addstaff = (req, res) => {
    try{
        var obj = Director.add_staff(
            req.body.name, 
            req.body.type, 
            req.body.gender, 
            req.body.date_of_join, 
            req.body.date_of_leave,
            req.body.dob,
            req.body.salary, 
            req.body.phone, 
            req.body.passwd_hash, 
            req.body.address, 
            req.body.slot_name )
        obj.then(result =>{
            res.status(200).json({msg: "director addstaff success"});
        })

        if(req.body.type == "Nurse"){
            var obj = new Nurse(req.body.id, req.body.dept_name, req.body.ward_num);
            obj.add_nurse();
        }
        
        if(req.body.type == "Doctor"){
            var obj = new Doctor(
                req.body.id,
                req.body.dept_name,
                req.body.fee,
                req.body.room_no,
                req.body.appoints_per_slot);

            obj.add_doctor();
        }
        if(req.body.type == "Pathologist"){
            var obj = new Pathologist(req.body.id);
            obj.add_pathologist();
        }
        

    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_removestaff = (req, res) => {
    try{
        res.status(200).json({msg: "director removestaff success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}
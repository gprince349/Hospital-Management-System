const { Director, Nurse, Doctor, Pathologist, Accountant, Pharmacy_keeper } = require("../models/staff");
const { adminStr } = require("../utils/constants");
const auth = require("../utils/auth");
const CONST = require("../utils/constants")

let file = __filename.slice(__dirname.length + 1);

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

exports.post_addstaff = async (req, res) => {
    try{
        if(res.locals.dtoken["type"] != CONST.directorStr && res.locals.dtoken["type"] != CONST.adminStr){
            throw Error("Only director and admin can access this api");
        }
        var obj = await Director.add_staff(
            req.body.name, 
            req.body.type, 
            req.body.gender, 
            formatDate(Date()), 
            "",
            req.body.dob,
            req.body.salary, 
            req.body.phone, 
            await auth.hash_passwd(req.body.password),
            req.body.address, 
            req.body.slot_name )


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

        if(req.body.type == "Accountant"){
            var obj = new Accountant(req.body.id);
            obj.add_accountant();
        }

        if(req.body.type == "Pharmacy_keeper"){
            var obj = new Pharmacy_keeper(req.body.id);
            obj.add_pharmacy_keeper();
        }

        if(req.body.type == "Admin"){
            var obj = new Admin(req.body.id);
            obj.add_admin();
        }

        res.status(200).json({msg: "director addstaff success"});

    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_removestaff = (req, res) => {
    try{
        res.status(200).json({msg: "director removestaff success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}
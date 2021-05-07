const { Director, Nurse, Doctor, Pathologist, Accountant, Pharmacy_keeper, Staff } = require("../models/staff");
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
        console.log(req.body)
        var obj = await Director.add_staff(
            req.body.name, 
            req.body.type, 
            req.body.gender, 
            formatDate(Date()), 
            null,
            req.body.dob,
            req.body.salary, 
            req.body.phone, 
            await auth.hash_passwd(req.body.password),
            req.body.address, 
            req.body.slot_name )

        // console.log("last")
        var id = 0
        var id_obj = await Staff.get_staff(req.body.phone)
        id_obj.then(result=>
            {
                id = result.rows[0]['id'];
                console.log(id) 
            })

        if(req.body.type == "nurse"){
            var obj = new Nurse(id, req.body.dept_name, req.body.ward_num);
            obj.add_nurse();
        }
        
        if(req.body.type == "doctor"){
            var obj = new Doctor(
                id,
                req.body.dept_name,
                req.body.fee,
                req.body.room_no,
                req.body.appoints_per_slot);

            obj.add_doctor();
        }
        if(req.body.type == "pathologist"){
            var obj = new Pathologist(req.body.id);
            obj.add_pathologist();
        }

        if(req.body.type == "accountant"){
            var obj = new Accountant(req.body.id);
            obj.add_accountant();
        }

        if(req.body.type == "pharmacy_keeper"){
            var obj = new Pharmacy_keeper(req.body.id);
            obj.add_pharmacy_keeper();
        }

        if(req.body.type == "admin"){
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
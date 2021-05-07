let file = __filename.slice(__dirname.length + 1);
const auth = require("../utils/auth");
const Patient = require("../models/patient")
const { Staff , Doctor} = require("../models/staff")

exports.get_curUserDetails = async (req, res) => {
    try{
        const dtoken = res.locals.dtoken;
        let data = {type: dtoken.type};
        let info;
        if(dtoken.type === "patient"){
            info = await Patient.get_patient_info(dtoken.id);
            data["account_info"] = info.rows[0]['account_info'];
            data["balance"] = info.rows[0]['balance'];
            data["district"] = info.rows[0]['district'];
            data["state"] = info.rows[0]['state'];
            data["country"] = info.rows[0]['country'];
            data["height"] = info.rows[0]['height'];
            data["weight"] = info.rows[0]['weight'];
        }else{ // its staff
            info = await Staff.get_staff_info(dtoken.id);
            data["date_of_joining"] = info.rows[0]['date_of_joining'];
            data["date_of_leave"] = info.rows[0]['date_of_leave'];
            data["salary"] = info.rows[0]['salary'];
            data["slot_name"] = info.rows[0]['slot_name'];
        }
        data["name"] = info.rows[0]['name'];
        data["dob"] = info.rows[0]['dob'];
        data["phone"] = info.rows[0]['phone'];
        data["gender"] = info.rows[0]['gender'];
        data["address"] = info.rows[0]['address'];
        res.status(200).json(data);
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_stats = (req, res) => {
    try{
        res.status(200).json({msg: "public get stats success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_staffs = (req, res) => {
    try{
        res.status(200).json({msg: "public get staffs success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_doctors = (req, res) => {
    try{
        var obj = Doctor.get_doctor_list();
        obj.then(result => {
            res.status(200).json({msg: "public get doctors success", result});
        })
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_logout = (req, res) => {
    try{
        auth.unset_jwt_tokens(res);
        res.status(200).json({msg: "logout success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}
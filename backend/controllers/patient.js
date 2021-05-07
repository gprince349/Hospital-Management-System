let file = __filename.slice(__dirname.length + 1);
const auth = require("../utils/auth");
const Patient = require("../models/patient");
const Real_transaction = require("../models/trans");
const CONS = require("../utils/constants")
const bcrypt = require("bcrypt");

exports.get_history = (req, res) => {
    try{
        res.status(200).json({msg: "patient get history success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

// handle POST request for login
exports.post_login = async (req, res) => {
    try{
        let {phone, password} = req.body;
        let result = await Patient.get_patient(phone);
        if(result.rowCount > 0){
            let tup = result.rows[0];
            const verified = bcrypt.compareSync(password, tup["passwd_hash"])
            if(verified){
                // login succeeded
                auth.set_jwt_token(res, tup["id"], CONS.patientStr);
                res.status(200).json({msg: `patient login success`});
            }else{
                throw Error("Login failed: Invalid password!!");
            }
        }else{
            throw Error(`no user with phone = ${phone} is registered`);
        }
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}
// handle POST request for register
exports.post_register = async (req, res) => {
    try{
        let phone = req.body.phone;
        let password = req.body.password;
        let name = req.body.name;
        let dob = req.body.dob;
        let gender = req.body.gender;

        let result = await Patient.get_patient(phone);
        if(result.rowCount > 0){
            throw Error(`user with phone = ${phone} is already registered`);
        }else{
            let newPatient = new Patient(phone, await auth.hash_passwd(password), name, dob, gender);
            await newPatient.save();
            // once saved successfully set the cookies and send it
            let savedPat = await Patient.get_patient(phone);
            if(savedPat.rowCount > 0){
                auth.set_jwt_token(res, savedPat.rows[0]["id"], CONS.patientStr);
                res.status(200).json({msg: `patient registration success`});
            }else{
                throw Error("Some error on server side. Please try again.");
            }
        }
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}
// to handle POST request to update details
exports.post_update_details = async (req, res) => {
    try{
        if(res.locals.dtoken["type"] != CONST.patientStr){
            throw Error("API access by invalid user");
        }
        let name = req.body.name;
        let dob = req.body.dob;
        let account_info = req.body.account_info;
        let gender = req.body.gender;
        let address = req.body.address;
        let district = req.body.district;
        let state = req.body.state;
        let country = req.body.country;
        let height = req.body.height;
        let weight = req.body.weight;

        let ID = res.locals.dtoken["id"];
        await Patient.update_details(ID, name,dob,account_info,
            gender,address,district,state,country,height,weight);

        res.status(200).json({msg: "Details updated successfully"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}


exports.post_bookAppoint = (req, res) => {
    try{
        let doctor_id=req.body.doctor_id;
        let slot_name = req.body.slot_name;
        let start_time = req.body.start_time;
        // console.log(start_time);
        let date = req.body.date;
        let ID = res.locals.dtoken["id"];
        Patient.book_appoint(doctor_id, slot_name, start_time, date, ID);
        res.status(200).json({msg: "patient book appointment success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}



exports.post_addMoney = (req, res) => {
    try{
        // var patient_id = req.body.patient_id
        // var amount = req.body.amount
        // const obj  = Real_transaction("", patient_id, amount);
        // obj.add_real_transaction();

        // console.log("Added Money");
        let amount = req.body.amount;
        let ID = res.locals.dtoken["id"];
        Patient.add_money(ID, amount);
        Patient.add_real_transaction(ID, amount);
        res.status(200).json({msg: "patient add money success"});

    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}


exports.post_withdrawMoney = (req, res) => {
    try{
        // var patient_id = req.body.patient_id
        // var amount = req.body.amount
        // const obj  = Real_transaction("", patient_id, amount);
        // obj.add_real_transaction();
        
        let amount = req.body.amount;
        let ID = res.locals.dtoken["id"];
        
        Patient.withdraw_money(ID, amount);
        res.status(200).json({msg: "patient withdraw money success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}


let file = __filename.slice(__dirname.length + 1);
const auth = require("../utils/auth");
const bcrypt = require("bcrypt")
const { Staff } = require("../models/staff")

exports.post_login = async (req, res) => {
    try{
        let {phone, password} = req.body;
        let result = await Staff.get_staff(phone);
        if(result.rowCount > 0){
            let tup = result.rows[0];
            const verified = bcrypt.compareSync(password, tup["passwd_hash"])
            if(verified){
                // login succeeded
                auth.set_jwt_token(res, tup["id"], tup["type"]);
                res.status(200).json({msg: `staff '${tup["type"]}' login success`});
            }else{
                throw Error("Login failed: Invalid password!!");
            }
        }else{
            throw Error(`no staff with phone = ${phone} is registered`);
        }
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}


exports.get_prescription = (req, res) => {
    try{
        res.status(200).json({msg: "staff prescription/:id success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_report = (req, res) => {
    try{
        res.status(200).json({msg: "staff report/:id success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_appoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff appoints success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_testAppoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff testAppoints success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_patientinfo = (req, res) => {
    try{
        res.status(200).json({msg: "staff patientinfo success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_patientAppoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff patientAppoints success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.get_patientTestAppoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff patientTestAppoints success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

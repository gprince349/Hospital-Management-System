let file = __filename.slice(__dirname.length + 1);
const auth = require("../utils/auth");

exports.post_login = (req, res) => {
    try{
        auth.set_jwt_token(res, '101', "doctor");
        res.status(200).json({msg: "staff login success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}


exports.get_prescription = (req, res) => {
    try{
        res.status(200).json({msg: "staff prescription/:id success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_report = (req, res) => {
    try{
        res.status(200).json({msg: "staff report/:id success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_appoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff appoints success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_testAppoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff testAppoints success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_patientinfo = (req, res) => {
    try{
        res.status(200).json({msg: "staff patientinfo success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_patientAppoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff patientAppoints success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_patientTestAppoints = (req, res) => {
    try{
        res.status(200).json({msg: "staff patientTestAppoints success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

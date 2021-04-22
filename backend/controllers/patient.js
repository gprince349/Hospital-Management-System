let file = __filename.slice(__dirname.length + 1);
const auth = require("../utils/auth");

exports.get_history = (req, res) => {
    try{
        res.status(200).json({msg: "patient get history success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_login = (req, res) => {
    try{
        auth.set_jwt_token(res, '102', 'patient');
        res.status(200).json({msg: "patient login success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_bookAppoint = (req, res) => {
    try{
        res.status(200).json({msg: "patient book appointment success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_addMoeny = (req, res) => {
    try{
        res.status(200).json({msg: "patient add money success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_withdrawMoney = (req, res) => {
    try{
        res.status(200).json({msg: "patient withdraw money success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

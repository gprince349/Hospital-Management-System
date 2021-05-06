let file = __filename.slice(__dirname.length + 1);
const auth = require("../utils/auth");
const Patient = require("../models/patient")

exports.get_history = (req, res) => {
    try{
        res.status(200).json({msg: "patient get history success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_login = (req, res) => {
    try{
        // let {phone, password} = req.body;
        // let result = await Patient. (phone);
        // if(result.rowCount > 0){
        //     let tup = result.rows[0];
        //     const verified = bcrypt.compareSync(password, tup["passwd_hash"])
        //     if(verified){
                // login succeeded
                auth.set_jwt_token(res, tup["id"], tup["type"]);
                res.status(200).json({msg: `staff '${tup["type"]}' login success`});
            // }else{
        //         throw Error("Login failed: Invalid password!!");
        //     }
        // }else{
        //     throw Error(`no staff with phone = ${phone} is registered`);
        // }
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_bookAppoint = (req, res) => {
    try{
        res.status(200).json({msg: "patient book appointment success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_addMoeny = (req, res) => {
    try{
        res.status(200).json({msg: "patient add money success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

exports.post_withdrawMoney = (req, res) => {
    try{
        res.status(200).json({msg: "patient withdraw money success"});
    }catch(e){
        console.log(file, e.stack);
        res.status(200).json({error: e.message});
    }
}

let file = __filename.slice(__dirname.length + 1);
const CONST = require("../utils/constants")

exports.get_freeslot = (req, res) => {
    try{
        res.status(200).json({msg: "doctor freeslot success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.get_appoints = (req, res) => {
    try{
        if(res.locals.dtoken["type"] != CONST.doctorStr){
            throw Error("Only doctors can access this api");
        }

        res.status(200).json([
            {a:"appoint1"},
            {a:"appoint2"},
            {a:"appoint3"}
        ]);
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_markComplete = (req, res) => {
    try{
        res.status(200).json({msg: "doctor markComplete success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_cancelAppoint = (req, res) => {
    try{
        res.status(200).json({msg: "doctor cancelAppoint success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_addpresc = (req, res) => {
    try{
        res.status(200).json({msg: "doctor add prescription success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_modifypresc = (req, res) => {
    try{
        res.status(200).json({msg: "doctor modify prescription success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}
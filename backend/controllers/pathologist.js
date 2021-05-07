const { Pathologist } = require("../models/staff");

let file = __filename.slice(__dirname.length + 1);

exports.post_update = (req, res) => {
    try{
        res.status(200).json({msg: "pathologist update success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.get_pres_details = (req, res) => {
    try{
        var obj = Pathologist.get_prescription(req.body.pat_id);
        obj.then(result => {

            res.status(200).json({msg: "patient details", result});
        })

    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_take_sample = (req,res) => {
    try{
        var obj = Pathologist.take_sample(req.body.appoint_id);
        obj.then( result => {
            res.status(200).json({msg: "pathologist update success",result});
        })

    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_addreport = (req, res) => {
    try{
        //**************generate path somehow for FTP */
        var obj = Pathologist.add_report(req.body.path_of_result,req.body.appoint_id)
        obj.then(result =>{
            res.status(200).json({msg: "pathologist add report success",result});
        })
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_cancelTestAppoint = (req, res) => {
    try{
        var obj = Pathologist.cancel_appointment(req.body.appoint_id, req.body.fee, req.body.pat_id)
        obj.then(result =>{
            res.status(200).json({msg: "pathologist cancel test appointment success", result});
        })
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}
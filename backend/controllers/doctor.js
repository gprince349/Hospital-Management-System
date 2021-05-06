let file = __filename.slice(__dirname.length + 1);

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
        res.status(200).json({msg: "doctor appoints success"});
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
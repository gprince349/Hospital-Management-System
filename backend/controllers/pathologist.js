let file = __filename.slice(__dirname.length + 1);

exports.post_update = (req, res) => {
    try{
        res.status(200).json({msg: "pathologist update success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_addreport = (req, res) => {
    try{
        res.status(200).json({msg: "pathologist add report success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_cancelTestAppoint = (req, res) => {
    try{
        res.status(200).json({msg: "pathologist cancel test appointment success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}
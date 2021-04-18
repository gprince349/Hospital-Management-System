let file = __filename.slice(__dirname.length + 1);

exports.get_stats = (req, res) => {
    try{
        res.status(200).json({msg: "public get stats success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_staffs = (req, res) => {
    try{
        res.status(200).json({msg: "public get staffs success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.get_doctors = (req, res) => {
    try{
        res.status(200).json({msg: "public get doctors success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}
let file = __filename.slice(__dirname.length + 1);

exports.post_addstaff = (req, res) => {
    try{
        res.status(200).json({msg: "director addstaff success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_removestaff = (req, res) => {
    try{
        res.status(200).json({msg: "director removestaff success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}
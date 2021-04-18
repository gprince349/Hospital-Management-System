let file = __filename.slice(__dirname.length + 1);

exports.post_login = (req, res) => {
    try{
        res.status(200).json({msg: "admin login success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_logout = (req, res) => {
    try{
        res.status(200).json({msg: "admin logout success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}
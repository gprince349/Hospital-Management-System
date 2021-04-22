let file = __filename.slice(__dirname.length + 1);
const auth = require("../utils/auth");

exports.get_curUserDetails = (req, res) => {
    try{
        let dtoken = auth.decodeToken(req.cookies.jwt);
        res.status(200).json({
            type: dtoken.type,
            name: "DummyName",
            other: "Not present for now"
        });
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

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

exports.get_logout = (req, res) => {
    try{
        auth.unset_jwt_tokens(res);
        res.status(200).json({msg: "logout success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}
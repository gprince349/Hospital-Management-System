let file = __filename.slice(__dirname.length + 1);

exports.get_all = (req, res) => {
    try{
        res.status(200).json({msg: "pharmacy get all success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_add = (req, res) => {
    try{
        res.status(200).json({msg: "pharmacy add success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_update = (req, res) => {
    try{
        res.status(200).json({msg: "pharmacy update success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_search = (req, res) => {
    try{
        res.status(200).json({msg: "pharmacy search success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}

exports.post_checkout = (req, res) => {
    try{
        res.status(200).json({msg: "pharmacy checkout success"});
    }catch(e){
        console.log(file, e.messsage);
        res.status(200).json({error: e.messsage});
    }
}
let file = __filename.slice(__dirname.length + 1);

exports.post_addMoney = (req, res) => {
    try{
        res.status(200).json({msg: "accountant addmoney success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_withdrawMoney = (req, res) => {
    try{
        res.status(200).json({msg: "accountant withdraw success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}
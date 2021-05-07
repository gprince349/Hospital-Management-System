let file = __filename.slice(__dirname.length + 1);

exports.post_addMoney = (req, res) => {
    try{
        let id = req.body.id
        let acc_id = req.body.accountant_id
        let patient_id = req.body.patient_id
        let amount = req.body.amount
        var obj = add_money(id,acc_id,patient_id,amount)
        // add_money(id, accountant_id, patient_id, amount)
        res.status(200).json({msg: "accountant addmoney success"},obj);
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_withdrawMoney = (req, res) => {
    try{
        let id = req.body.id
        let acc_id = req.body.accountant_id
        let patient_id = req.body.patient_id
        let amount = req.body.amount
        var obj = return_money(id,acc_id,patient_id,amount)
        // return_money(id, accountant_id, patient_id, amount)
        res.status(200).json({msg: "accountant withdraw success"},obj);
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}
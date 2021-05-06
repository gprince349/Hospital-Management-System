let file = __filename.slice(__dirname.length + 1);

exports.get_all = (req, res) => {
    try{
        var obj = get_all()
        res.status(200).json({msg: "pharmacy get all success"},obj);
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_add = (req, res) => {
    try{
        let id = req.body.id
        let name = req.body.name
        let price = req.body.name
        let company = req.body.company
        let available_quantity = req.body.available_quantity

        var obj = add_medicine(id, name, price, company, available_quantity)
        res.status(200).json({msg: "pharmacy add success"},obj);
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_update = (req, res) => {
    try{
        let id = req.body.id
        let name = req.body.name
        let price = req.body.name
        let company = req.body.company
        let available_quantity = req.body.available_quantity

        var obj = update_medicine(id, name, price, company, available_quantity)
        res.status(200).json({msg: "pharmacy update success"},obj);
    }
    catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}

exports.post_search = (req, res) => {
    try{
        let id = req.body.id
        // let name = req.body.name
        // let price = req.body.name
        // let company = req.body.company
        // let available_quantity = req.body.available_quantity
        var obj = check_availability(id)
        res.status(200).json({msg: "pharmacy search success"},obj);
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}
//what is this??????????????????
exports.post_checkout = (req, res) => {
    try{
        res.status(200).json({msg: "pharmacy checkout success"});
    }catch(e){
        console.log(file, e.message);
        res.status(200).json({error: e.message});
    }
}
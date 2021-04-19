const pool = require('../utils/database')


module.exports =  class Medicine{
    constructor(id, name, price, company, available_quantity){
        this.id = id;
        this.name = name;
        this.price = price;
        this.company = company;
        this.available_quantity = available_quantity;
    }

    add_medicine(){
        var sql = 'INSERT INTO medicine VALUES($1, $2, $3, $4, $5);'
        var values = [this.id, this.name, this.price, this.company, this.available_quantity];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }
};
const pool = require('../utils/database')


class Lab{
    constructor(id, name, address, appoints_per_slot, slot_name){
        this.id = id;
        this.name = name;
        this.address = address;
        this.appoints_per_slot = appoints_per_slot;
        this.slot_name = slot_name;
    }

    add_lab(){
        var sql = 'INSERT INTO lab VALUES($1, $2, $3, $4, $5);'
        var values = [this.id, this.name, this.address, this.appoints_per_slot, this.slot_name];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }
};

class Test{
    constructor(test_id, lab_id, test_name, test_fee, description){
        this.test_id = test_id;
        this.lab_id = lab_id;
        this.test_name = test_name;
        this.test_fee = test_fee;
        this.description = description;
    }

    add_test(){
        var sql = 'INSERT INTO test VALUES($1, $2, $3, $4, $5);'
        var values = [this.test_id, this.lab_id, this.test_name, this.test_fee, this.description];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }

};

module.exports = {Lab, Test}
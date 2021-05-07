const pool = require('../utils/database')


class Slot{
    constructor(name){
        this.name = name;
    }

    add_slot(){
        var sql = 'INSERT INTO slot VALUES($1);'
        var values = [this.name];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }

    static get_all_slot(){
        var sql = 'Select name from slot';
        return pool.query(sql)
    }
        
};

class Slot_interval{
        constructor(name, day, start_time, end_time){
            this.name = name;
            this.day = day;
            this.start_time = start_time;
            this.end_time = end_time;
        }

        add_slot_interval(){
            var sql = 'INSERT INTO slot_interval VALUES($1,$2,$3,$4);'
            var values = [this.name, this.day, this.start_time, this.end_time];
            
            pool.query(sql,values)
            .then( res => {
                console.log(res);
            })
            .catch( err => { console.log(err)});
        }
};

module.exports = {Slot, Slot_interval}
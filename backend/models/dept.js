const pool = require('../utils/database')


class Department{
    constructor(name){
        this.name = name;
    }

    add_department(){
        var sql = 'INSERT INTO department VALUES($1);'
        var values = [this.name];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }

    get_all(){
        var sql = 'SELECT * from department;'

        pool.query(sql, (err,res)=>{
            console.log(res.rows)
        })
    }

};

class Ward{
    constructor(dept_name, ward_num, type, charge_per_day){
        this.dept_name = dept_name;
        this.ward_num = ward_num;
        this.type = type;
        this.charge_per_day = charge_per_day;
    }

    add_ward(){
        var sql = 'INSERT INTO ward VALUES($1,$2,$3,$4);'
        var values = [this.dept_name, this.ward_num, this.type, this.charge_per_day];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }
};


class Bed{
    constructor(dept_name, ward_num, bed_num){
        this.dept_name = dept_name;
        this.ward_num = ward_num;
        this.bed_num = bed_num;
    }

    add_bed(){
        var sql = 'INSERT INTO bed VALUES($1,$2,$3);'
        var values = [this.dept_name, this.ward_num, this.bed_num];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }
}

module.exports = {Department, Ward, Bed}
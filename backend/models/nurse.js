const pool = require('../utils/database')

module.exports = class nurse{
   constructor(id, dept_name, ward_num){
            this.id = id;
            this.dept_name = dept_name;
            this.ward_num = ward_num;
   }

    add_nurse(){
        var sql = 'INSERT INTO nurse VALUES ($1, $2, $3);';
        
        values = [this.id, this.dept_name, this.ward_num];
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)})
    }

    get_all(){
        var sql = 'Select * from nurse ;';

        pool.query(sql, (err,res)=>{
            console.log(err,res.rows);
        })

    }
};
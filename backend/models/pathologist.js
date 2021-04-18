const pool = require('../utils/database')

module.exports = class pathologist{
   constructor(id, lab_id){
            this.id = id;
            this.lab_id = lab_id;
   }

    add_pathologist(){
        var sql = 'INSERT INTO pathologist VALUES ($1, $2);';
        
        values = [this.id, this.lab_id];
        
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)})
    }

    get_all(){
        var sql = 'Select * from pathologist ;';

        pool.query(sql, (err,res)=>{
            console.log(err,res.rows);
        })
    }
};
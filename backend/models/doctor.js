const pool = require('../utils/database')

module.exports = class doctor{
    constructor(id,dept_name, fee, room_no, appoints_per_slot){
            this.id          = id;
            this.dept_name   = dept_name;
            this.fee         = fee;
            this.room_no     = room_no;
            this.appoints_per_slot           = appoints_per_slot;
    }

    add_doctor(){
        sql = 'INSERT INTO doctor VALUES ($1, $2, $3, $4, $5);';
        values = [this.id, this.dept_name, this.fee, this.room_no, this.appoints_per_slot];

        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)})
    }
};
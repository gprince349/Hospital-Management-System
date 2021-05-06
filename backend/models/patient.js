const pool = require("../utils/database");


module.exports =  class Patient{
    
    constructor(id, name, dob, phone, passwd_hash, account_info,
         balance, gender, address, district, state, country, height, weight){
            this.id          = id;       
            this.name        = name;         
            this.dob         = dob;        
            this.phone       = phone;          
            this.passwd_hash = passwd_hash;            
            this.account_info = account_info;          
            this.balance     = balance;            
            this.gender      = gender;           
            this.address     = address;            
            this.distric     = district;       t     
            this.state       = state;          
            this.country     = country;            
            this.height      = height;           
            this.weight      = weight;           
    }

    add_patient(){
        sql = 'INSERT INTO patient VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);'
       values = [this.id, this.name, this.dob, this.phone, this.passwd_hash, this.account_info,
         this.balance, this.gender, this.address, this.distric, this.state, this.country, this.height, this.weight];
            
        pool.query(sql,values)
        .then( res => {
            console.log(res);
        })
        .catch( err => { console.log(err)});
    }

    ////////////////STATIC METHODS FOR QUERYING DATABASE ///////////////////////
    
    //getting patient Info
    static get_patient_info(id){
        const sql = 'SELECT * from patient where id = $1'
        var values = [id]

        return pool.query(sql, values)
    }

    static patient_login(phone, passwd_hash){
        const sql = 'Select * from patient where phone = $1 and passwd_hash = $2;'

        var values = [phone, passwd_hash]

        return pool.query(sql, values)
    }


};

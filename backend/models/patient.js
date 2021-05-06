const pool = require("../utils/database");


module.exports =  class Patient{
    
    // constructor(id, name, dob, phone, passwd_hash, account_info,
    //      balance, gender, address, district, state, country, height, weight){
    //              this.id          = id;       
    //         this.name        = name;         
    //         this.dob         = dob;        
    //              this.phone       = phone;          
    //              this.passwd_hash = passwd_hash;            
    //         this.account_info = account_info;          
    //              this.balance     = balance;            
    //         this.gender      = gender;           
    //         this.address     = address;            
    //         this.distric     = district;
    //         this.state       = state;          
    //         this.country     = country;            
    //         this.height      = height;           
    //         this.weight      = weight;           
    // }
    constructor(phone, passwd_hash, name, dob, gender){
        this.phone = phone;
        this.passwd_hash = passwd_hash;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
    }

    save(){
        const sql = 'INSERT INTO patient (phone, passwd_hash, name, dob, gender) \
                        VALUES ($1,$2,$3,$4,$5);'
        const values = [this.phone, this.passwd_hash, this.name, this.dob, this.gender];
        
        return pool.query(sql,values)
    }

    ////////////////STATIC METHODS FOR QUERYING DATABASE \\\\\\\\\\\\\\\\\\\\\\\

    static get_patient(phone){
        const sql = 'SELECT * from patient where phone = $1'
        var values = [phone]

        return pool.query(sql, values)
    }

    //getting patient Info
    static get_patient_info(id){
        const sql = 'SELECT * from patient where id = $1'
        var values = [id]

        return pool.query(sql, values)
    }

    static update_details(ID,name,dob,account_info,gender,address,district,state,country,height,weight){
        const sql = 'UPDATE patient SET (name,dob,account_info,gender,address,district,state,country,height,weight)\
                = ($2,$3,$4,$5,$6,$7,$8,$9,$10,$11)\
                where ID = $1;'
        const values = [ID,name,dob,account_info,gender,address,district,state,country,height,weight];

        return pool.query(sql,values)
    }

};

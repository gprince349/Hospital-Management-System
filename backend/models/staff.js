const pool = require("../utils/database");

module.exports = class Staff{
    constructor(id,name, type, gender, date_of_join, date_of_leave, dob, 		      
        salary, phone, passwd_hash, address, slot_name){

            this.id            = id;      
            this.name          = name;        
            this.type          = type;					t
            this.gender        = gender;   
            this.date_of_join  = date_of_join;
            this.date_of_leave = date_of_leave;
            this.dob           = dob 		  ; 		      
            this.salary        = salary 	; 		   
            this.phone         = phone 		; 		    
            this.passwd_hash   = passwd_hash;
            this.address       = address 	 ; 	   
            this.slot_name     = slot_name	;	  
    }

    add_staff(){
        sql = 'INSERT INTO staff VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);'
        values = [this.id, this.name, this.type, this.gender, this.date_of_join, this.date_of_leave,
            this.dob, this.salary, this.phone, this.passwd_hash, this.address, this.slot_name];

            
        pool.query(sql,values).then( res => {
            console.log(res);
        });
    }
    
};


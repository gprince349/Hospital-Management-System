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

    

    static add_money(id, amount){
        console.log(id);
        const sql = 'update patient set balance = balance + $1 where id = $2;'
        const values = [amount,id];

        return pool.query(sql,values)
    }

    static withdraw_money(id, amount){
        console.log(id);
        const sql = 'update patient set balance = balance - $1 where id = $2 and balance >= $1;'
        const values = [amount,id];

        return pool.query(sql,values)
    }

    static add_real_transaction(id,amount){
        var sql =  'INSERT INTO real_transaction (accountant_id, patient_id, amount) VALUES (NULL,$2, $1);'
                    

        var values = [amount, id];
        
        return pool.query(sql,values)
        // .then( res => {
        //     console.log(res);
        // })
        // .catch( err => { console.log(err)});
    }

    static update_details(ID,name,dob,account_info,gender,address,district,state,country,height,weight){
        const sql = 'UPDATE patient SET (name,dob,account_info,gender,address,district,state,country,height,weight)\
                = ($2,$3,$4,$5,$6,$7,$8,$9,$10,$11)\
                where ID = $1;'
        const values = [ID,name,dob,account_info,gender,address,district,state,country,height,weight];

        return pool.query(sql,values)
    }
    // static add_to_balance(id,amount){
    //     const sql = 'UPDATE patient SET balance = balance + $2 where id = $1;'
    //     var values = [id,amount]

    //     return pool.query(sql, values)
    // }

    // static deduct_from_balance(id,amount){
    //     const sql = 'UPDATE patient SET balance = balance - $2 where id = $1;'
    //     var values = [id,amount]

    //     return pool.query(sql, values)
    // }

    static login_to_dashboard(phone,passwd_hash)
    {
        const sql = 'select * from patient where phone = $1 and passwd_hash = $2;'
        var values = [phone,passwd_hash]

        return pool.query(sql,values)
    }

    static get_appoint(id)
    {
        const sql = 'select * from appointment a inner join doctor d on (a.doctor_id = d.id) where patient_id = $1 order by date_appoint;'
        var values = [$1]
        return pool.query(sql,values);
    }

    static get_test(id)
    {
        const sql = 'select * from test_appointment a inner join pathologist d on (a.pathologist_id = d.id) inner join test t using (test_id) where patient_id = $1 order by date_appoint;'
        var values = [$1]
        return pool.query(sql,values);
    }

    static get_slot(id)
    {
        const sql = 'select * from staff s inner join doctor d using ($1);'
        var values = [$1]
        return pool.query(sql,values);
    }

    static get_slot(id)
    {
        const sql = 'select * from staff s inner join doctor d using ($1);'
        var values = [$1]
        return pool.query(sql,values);
    }

    static book_slot(id)
    {
        const sql = 'with max_appoints as( \\\
                select appoints_per_slot from doctor where id = $1), \\\
                d_slot_name as( \\\
                select slot_name from staff where id = $1), \\\
                slots(slot_name, day, start_time, end_time) as( \\\
                select *  \\\
                from slot_interval \\\
                where name = d_slot_name), \\\
                slot_count(slot_name, day, start_time, count) as( \\\
                select slot_name, day, start_time , count(*) \\\
                from appointment \\\
                where date_appoint >= current_date and time_start > current_time \\\
                and doctor_id = $1 \\\
                group by slot_name, day, start_time) \\\
                \\\
                select slot_name, day, start_time, end_time, coalesce(count, 0), \\\
                (case when (day = extract(dow from current_date) and start_time =< current_time)\\\
                            then current_date + 7\\\
                     when (day = extract(dow from current_date) and start_time > current_time)\\\
                            then current_date\\\
                     else current_date + MOD(day - extract(dow from current_date) + 7, 7)\\\
                end) as "date"\\\
                from slots left outer join slot_count using(slot_name, day, start_time)\\\
                where (count < max_appoints OR count is null)\\\
                ;'
        var values = [id]

        return pool.query(sql,values);
    }

    static make_payement_doc(d_id,day,time,date,p_id,fee)
    {
        const sql = 'BEGIN TRANSACTION; \\\
        with max_appoints as( \\\
            select appoints_per_slot from doctor where id = $1),\\\
            d_slot_name as(\\\
                select slot_name from staff where id = $1),\\\
            slots(slot_name, day, start_time, end_time) as(\\\
                select * \\\
                from slot_interval\\\
                where name = d_slot_name and day = $2 and start_time = $3 ),\\\
            slot_count(slot_name, day, start_time, count) as(\\\
                select slot_name, day, start_time , count(*)\\\
                from appointment\\\
                where date_appoint >= current_date and time_start > current_time\\\
                    and doctor_id = $1 and day = $2 and start_time = $3\\\
                group by slot_name, day, start_time),\\\
            cur_appoints as(\\\
                select coalesce(count, 0)\\\
                from slots left outer join slot_count using(slot_name, day, start_time))\\\
                \\\
                \\\
                select book_appoint (max_appoints, cur_appoints, date($4), time($3), p_id($5), d_id($1), fee($6));\\\
        COMMIT TRANSACTION;'
        var values = [d_id,day,time,date,p_id,fee]
        
        return pool.query(sql,values)
    }


    static make_payement_test(d_id,day,time,date,p_id,fee)
    {
        const sql = 'BEGIN TRANSACTION; \\\
        with max_appoints as( \\\
            select appoints_per_slot from doctor where id = $1),\\\
            d_slot_name as(\\\
                select slot_name from staff where id = $1),\\\
            slots(slot_name, day, start_time, end_time) as(\\\
                select * \\\
                from slot_interval\\\
                where name = d_slot_name and day = $2 and start_time = $3 ),\\\
            slot_count(slot_name, day, start_time, count) as(\\\
                select slot_name, day, start_time , count(*)\\\
                from appointment\\\
                where date_appoint >= current_date and time_start > current_time\\\
                    and doctor_id = $1 and day = $2 and start_time = $3\\\
                group by slot_name, day, start_time),\\\
            cur_appoints as(\\\
                select coalesce(count, 0)\\\
                from slots left outer join slot_count using(slot_name, day, start_time))\\\
                \\\
                \\\
                select book_appoint (max_appoints, cur_appoints, date($4), time($3), p_id($5), d_id($1), fee($6));\\\
        COMMIT TRANSACTION;'
        var values = [d_id,day,time,date,p_id,fee]
        
        return pool.query(sql,values)
    }

    static wallet_to_bank(balance,id,acc_id)
    {
        const sql = 'BEGIN TRANSACTION; \\\
        insert into real_transaction(accountant_id, patient_id, amount) values (null, $2, $1);\\\
        update patient set balance = balance + $1 where id = $2;\\\
        COMMIT TRANSACTION;\\\
        '
        var values = [balance,id,acc_id]

        return pool.query(sql,values)
    }

    static deduct_from_wallet(amount,id)
    {
        const sql = 'BEGIN TRANSACTION;\\\
        insert into real_transaction(accountant_id, patient_id, amount) values (null, $2, $1);\\\
        update patient set balance = balance - $1 where id = $2;\\\
        COMMIT TRANSACTION;\\\
        '
        var values = [amount,id]

        return pool.query(sql,values)
    }

    static book_appoint(doctor_id, slot_name, start_time, date, patient_id){
        const sql = "insert into appointment (timestamp_, date_appoint, status, doctor_id, patient_id, slot_name, slot_day, start_time, end_time) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)"
        let date_ob = new Date();
        let curdate = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let curDate=year + "-" + month + "-" + curdate;
        let curTime=hours + ":" + minutes + ":" + seconds;
        let day=date_ob.getDay();

        var start_hour= parseInt(start_time.split(":")[0])
        var start_mins= parseInt(start_time.split(":")[1])
        var end_mins="0";
        start_hour=(start_hour+1)%24;
        
        var end_hour=start_hour.toString();
        var end_time=end_hour+":"+end_mins;
        // console.log(start_hour);

        var values=[curDate+" "+curTime, date, "scheduled", doctor_id, patient_id, slot_name, day, start_time,end_time]
        console.log(values)
        return pool.query(sql, values)
    }

    static book_test_appoint(test_id, slot_name, start_time, date, patient_id, pathologist_id){
        const sql = "insert into test_appointment (test_id, timestamp_, pathologist_id, patient_id, slot_name, slot_day, start_time, end_time, date_appoint, status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)"
        let date_ob = new Date();
        let curdate = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let curDate=year + "-" + month + "-" + curdate;
        let curTime=hours + ":" + minutes + ":" + seconds;
        let day=date_ob.getDay();

        var start_hour= parseInt(start_time.split(":")[0])
        var start_mins= parseInt(start_time.split(":")[1])
        var end_mins="0";
        start_hour=(start_hour+1)%24;
        
        var end_hour=start_hour.toString();
        var end_time=end_hour+":"+end_mins;
        // console.log(start_hour);

        const values=[test_id, curDate+" "+curTime, pathologist_id,patient_id, slot_name, day, start_time,end_time, date, "scheduled"]
        console.log(test_id)
        return pool.query(sql, values)
    }

    static verify_appointment(id, appointment_id,test_id)
    {
        const sql = 'select * from appointment a inner join prescribed_tests p on (a.id = p.prescription_id) where patient_id = $1 and p.prescription_id=$2 and test_id=$3 order by date_appoint;'
        var values = [id, appointment_id,test_id]
        return pool.query(sql,values);
    }

    // static get_patient_info(id){
    //     const sql = 'SELECT * from patient where id = $1;'
    //     var values = [id]

    //     return pool.query(sql, values)
    // }

    // static get_patient_info(id){
    //     const sql = 'SELECT * from patient where id = $1;'
    //     var values = [id]

    //     return pool.query(sql, values)
    // }

    // static get_patient_info(id){
    //     const sql = 'SELECT * from patient where id = $1;'
    //     var values = [id]

    //     return pool.query(sql, values)

};

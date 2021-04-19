const pool = require('../utils/database')


class Wallet_transaction{
        constructor(id, patient_id, amount, service){
            this.id = id;
            this.patient_id = patient_id;
            this.amount = amount;
            this.service = service;
        }

        add_wallet_transaction(){
            var sql = 'INSERT INTO wallet_transaction VALUES($1,$2,$3, $4);'
            var values = [this.id, this.patient_id, this.amount, this.service];
            
            pool.query(sql,values)
            .then( res => {
                console.log(res);
            })
            .catch( err => { console.log(err)});
        }
};

class Real_transaction{
        constructor(id, accountant_id, patient_id, amount){
            this.id = id;
            this.accountant_id = accountant_id;
            this.patient_id = patient_id;
            this.amount = amount;
        }

        add_real_transaction(){
            var sql =  'BEGIN; \
                        INSERT INTO real_transaction VALUES($1,$2,$3, $4); \
                        Update patient set balance = balance + $4 where id = $3; \
                        COMMIT;'

            var values = [this.id, this.accountant_id, this.patient_id, this.amount];
            
            return pool.query(sql,values)
            // .then( res => {
            //     console.log(res);
            // })
            // .catch( err => { console.log(err)});
        }

};

module.exports = {Wallet_transaction,Real_transaction}
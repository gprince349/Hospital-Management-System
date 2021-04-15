const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,     //your postgres username
    host: process.env.DB_HOST, 
    database: process.env.DATABASE, //your local database 
    password: process.env.DB_PASSWORD, //your postgres user password
    port: Number(process.env.DB_PORT), //your postgres running port
});

pool.connect()
.then(()=>console.log("connected to database"))
.catch(e=>{
    console.log("Error connecting to database: ",e.message);
});


module.exports = pool;

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pool =  require('./utils/database');
const auth = require("./utils/auth");



const app = express();
const accRoute = require("./routes/accountant");
const admRoute = require("./routes/admin");
const dirRoute = require("./routes/director");
const docRoute = require("./routes/doctor");
const pathoRoute = require("./routes/pathologist");
const patientRoute = require("./routes/patient");
const phaRoute = require("./routes/pharmacy");
const pubRoute = require("./routes/public");
const staffRoute = require("./routes/staff");

// CORS to handle cross origine requests
app.use(cors({credentials:true, origin:process.env.ALLOWED_ORIGIN}));
// Common Middleware for all requests
app.use(express.urlencoded());  //
app.use(express.json());		// to parse json
app.use(cookieParser());        // to parse cookies
// middleware to print details of each request arrived
app.use((req, res, next) => {
    console.log(req.method, req.originalUrl, "[",req.ip,"]");
    next();
});

app.use("/admin", admRoute);
app.use("/staff", staffRoute);
app.use("/doctor", auth.requireAuth, docRoute);
app.use("/director", auth.requireAuth, dirRoute);
app.use("/pathologist", auth.requireAuth, pathoRoute);
app.use("/accountant", auth.requireAuth, accRoute);
app.use("/patient", patientRoute);
app.use("/pharmacy", auth.requireAuth, phaRoute);
app.use("/", pubRoute);



app.listen(Number(process.env.PORT), ()=>{
    console.log("listning on port", process.env.PORT);
});

// const { Department, Ward } = require("./models/dept");

// obj = new Department('ENT1111');
// obj.add_department();
// obj.get_all();

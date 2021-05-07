const CommonStaff = [
    {title:"Dashboard",     path:"./staffDashboard"},
    {title:"Profile",       path:"./staffProfile"}
];

const Menu ={
    'patient' : [
        {title:"Dashboard",     path:"./patDashboard"},
        {title:"Profile",       path:"./patProfile"},
        {title:"Book Appointment", path:"./bookAppoint"},
        {title:"Book Test Appoint", path:"./bookTestAppoint"},
        {title:"Add Moeny",     path:"./addMoney"},
        {title:"Withdraw Money", path:"./withdrawMoney"},
        {title:"History",       path:"./patHistory"},
    ],
    'doctor' : CommonStaff.concat([
        {title:"Appointments",  path:"./appoints"},
        {title:"History",       path:"./docHistory"},
    ]),
    'admin' : CommonStaff.concat([
        {title:"Staff",         path:"./staff"},
        {title:"Labs",          path:"./labs"},
    ]),
    'nurse' : CommonStaff.concat([
    ]),
    'pathologist' : CommonStaff.concat([
    ]),
    'pharmacy_keeper' : CommonStaff.concat([
    ]),
    'accountant' : CommonStaff.concat([
    ]),
    'director' : CommonStaff.concat([
    ])
}

export class User{
    details: Object;

    constructor(obj:Object){
        this.details = obj;
    }

    getMenu(){
        return Menu[this.details["type"]];
    }
};
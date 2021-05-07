const CommonMenu = [
    {title:"Dashboard", path:"./"},
    {title:"Profile", path:"./profile"}
];

const Menu ={
    'patient' : [
        {title:"Book Appointment", path:"./bookAppoint"},
        {title:"Book Test Appoint", path:"./bookTestAppoint"},
        {title:"History", path:"./history"},
    ],
    'doctor' : [
        {title:"Appointments", path:"appoints"},
        {title:"History", path:"history"},
    ],
    'admin' : [
        {title:"Staff", path:"staff"},
        {title:"Labs", path:"labs"},
    ],
    'nurse' : [],
    'pathologist' : [],
    'pharmacy_keeper' : [],
    'accountant' : [],
    'director' : []
}

export class User{
    details: Object;

    constructor(obj:Object){
        this.details = obj;
    }

    getMenu(){
        return CommonMenu.concat(Menu[this.details["type"]]);
    }
};
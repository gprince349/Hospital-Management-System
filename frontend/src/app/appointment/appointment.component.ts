import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  curUser:User;
  errmsg:string="";
  successMsg:string="";
  genderVal:string[] = ["male", "female", 'other'];
  appointFrom:FormGroup;
  constructor(private auth:AuthService,
    private router:Router,
    private api:ApiService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.auth.getCurUser(true).subscribe(u => {
      if(u instanceof Error){
        console.log(u);
        this.curUser = undefined;
      }else{
        this.curUser = u;

        this.appointFrom = this.fb.group({
          doctor_id:["",[
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ]],
          slot_name:["",[
            Validators.required,
          ]],
          start_time:["",[
            Validators.required,
          ]],
          date:["",[
              Validators.required
          ]]
        });
      }
    })
  }

  book(){
    this.api.post("/patient/bookAppoint", {
      doctor_id:this.doctor_id.value,
      slot_name:this.slot_name.value,
      start_time:this.start_time.value,
      date:this.date.value
    }, {})
    .subscribe((res) => {
      console.log(res);
      this.errmsg = res['error'];
      this.successMsg = res["msg"];
    })
  }

  get_slots(){
    this.api.get("/doctor/freeslots/"+this.doctor_id.value, {
      doctor_id:this.doctor_id.value
    })
    .subscribe((res) => {
      console.log(res);
      this.errmsg = res['error'];
      this.successMsg = res["msg"];
    })
  }

  get doctor_id(){ return this.appointFrom.get('doctor_id');}
  get slot_name(){ return this.appointFrom.get('slot_name');}
  get start_time(){ return this.appointFrom.get('start_time');}
  get date(){ return this.appointFrom.get('date');}

}

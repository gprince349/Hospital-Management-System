import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-test-appoint',
  templateUrl: './test-appoint.component.html',
  styleUrls: ['./test-appoint.component.css']
})
export class TestAppointComponent implements OnInit {

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
          prescription_id:["",[
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ]],
          test_id:["",[
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
    // console.log(this.date.value);
    this.api.post("/patient/testAppoint", {
      prescription_id:this.prescription_id.value,
      test_id:this.test_id.value,
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

  get prescription_id(){ return this.appointFrom.get('prescription_id');}
  get test_id(){ return this.appointFrom.get('test_id');}
  get slot_name(){ return this.appointFrom.get('slot_name');}
  get start_time(){ return this.appointFrom.get('start_time');}
  get date(){ return this.appointFrom.get('date');}

}

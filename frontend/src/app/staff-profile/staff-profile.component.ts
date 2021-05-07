import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {
  curUser:User;
  errmsg:string="";
  successMsg:string="";
  genderVal:string[] = ["male", "female", 'other'];
  detailFrom:FormGroup;

  constructor(private auth:AuthService,
    private api:ApiService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.auth.getCurUser(true).subscribe(u => {
      if(u instanceof Error){
        console.log(u);
        this.curUser = undefined;
      }else{
        this.curUser = u;
    
        const phone = this.fb.group({
          country_code:[{value:this.curUser.details["phone"].substr(0,3), disabled:true}, [
            Validators.required,
            Validators.pattern('^\\+[0-9]{2}$')
          ]],
          phone:[{value:this.curUser.details["phone"].substr(3), disabled:true},[
            Validators.required,
            Validators.pattern('^[0-9]{10}$')
          ]]
        });

        this.detailFrom = this.fb.group({
          phone:phone,
          name: [this.curUser.details["name"]],
          type: [{value:this.curUser.details["type"], disabled:true}],
          dob: [{value:this.curUser.details["dob"], disabled:true}, [
            Validators.required,
          ]],
          gender: [{value:this.curUser.details["gender"], disabled:true}, [
            Validators.required
          ]],
          date_of_joining: [{value:this.curUser.details["date_of_joining"], disabled:true}, [
            Validators.required
          ]],
          date_of_leave: [{value:this.curUser.details["date_of_leave"], disabled:true}],
          salary: [{value:this.curUser.details["salary"], disabled:true}],
          slot_name: [{value:this.curUser.details["slot_name"], disabled:true}],
          address: [this.curUser.details["address"]],
        });
      }
    })
  }

  update(){
    this.api.post("/staff/update", {
      name: this.name.value,
      address: this.address.value,
    }, {})
    .subscribe((res) => {
      console.log(res);
      this.errmsg = res['error'];
      this.successMsg = res["msg"];
    })
  }

  get ccode(){ return this.detailFrom.get('phone.country_code'); }
  get phone(){ return this.detailFrom.get('phone.phone'); }

  get name(){ return this.detailFrom.get('name'); }
  get dob(){ return this.detailFrom.get('dob'); }
  get gender(){ return this.detailFrom.get('gender'); }
  get account_info(){ return this.detailFrom.get('account_info'); }
  get address(){ return this.detailFrom.get('address'); }
}

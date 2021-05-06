import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  curUser:User;
  errmsg:string="";
  successMsg:string="";
  genderVal:string[] = ["male", "female", 'other'];
  detailFrom:FormGroup;

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
          dob: [this.curUser.details["dob"], [
            Validators.required,
          ]],
          gender: [this.curUser.details["gender"], [
            Validators.required
          ]],
          account_info: [this.curUser.details["account_info"]],
          address: [this.curUser.details["address"]],
          district: [this.curUser.details["district"]],
          state: [this.curUser.details["state"]],
          country: [this.curUser.details["country"]],
          height: [this.curUser.details["height"]],
          weight: [this.curUser.details["weight"]]
        });
      }
    })
  }

  update(){
    let phone = this.ccode.value + this.phone.value;
    this.api.post("/patient/update", {
      phone:phone, 
      name: this.name.value,
      dob: this.dob.value,
      gender: this.gender.value,
      account_info: this.account_info.value,
      address: this.address.value,
      district: this.district.value,
      state: this.state.value,
      country: this.country.value,
      height: this.height.value,
      weight: this.weight.value,
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
  get district(){ return this.detailFrom.get('district'); }
  get state(){ return this.detailFrom.get('state'); }
  get country(){ return this.detailFrom.get('country'); }
  get height(){ return this.detailFrom.get('height'); }
  get weight(){ return this.detailFrom.get('weight'); }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { User } from '../models';
import { StaffType } from '../constants';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  curUser:User;
  errmsg:string="";
  successMsg:string="";
  genderVal:string[] = ["male", "female", 'other'];
  staffType = StaffType;
  slotNames;
  detailFrom:FormGroup;

  constructor(private auth:AuthService,
    private api:ApiService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.api.get("/slots", {}).subscribe(res => {
      this.slotNames = res;
      
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
          name: ["", [Validators.required]],
          dob: ["", [Validators.required]],
          gender: ["", [Validators.required]],
          address: [""],
          salary: [0, [Validators.required]],
          type: ["", [Validators.required]],
          slot_name: ["", [Validators.required]]
        });
    })
  }

  update(){
    let phone = this.ccode.value + this.phone.value;
    this.api.post("/patient/update", {
      phone:phone, 
      name: this.name.value,
      dob: this.dob.value,
      gender: this.gender.value,
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
  get address(){ return this.detailFrom.get('address'); }

}

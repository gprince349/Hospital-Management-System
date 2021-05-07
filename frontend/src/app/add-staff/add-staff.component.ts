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
          country_code:["+91", [
            Validators.required,
            Validators.pattern('^\\+[0-9]{2}$')
          ]],
          phone:["",[
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
          slot_name: ["", [Validators.required]],
          dept_name: [""],
          fee: [0],
          room_no: [0],
          appoints_per_slot: [0],
          ward_num: [0]
        });
    })
  }

  addstaff(){
    let phone = this.ccode.value + this.phone.value;
    let data = {
      name: this.name.value,
      phone:phone, 
      dob: this.dob.value,
      gender: this.gender.value,
      address: this.address.value,
      salary: this.salary.value,
      type: this.type.value,
      slot_name: this.slot_name.value,
      dept_name: this.dept_name.value,
      fee: this.fee.value,
      room_no: this.room_no.value,
      appoints_per_slot: this.appoints_per_slot.value,
      ward_num: this.ward_num.value
    };
    this.api.post("/director/addstaff", data, {})
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
  get salary(){ return this.detailFrom.get('salary'); }
  get type(){ return this.detailFrom.get('type'); }
  get slot_name(){ return this.detailFrom.get('slot_name'); }

  get dept_name(){ return this.detailFrom.get('dept_name'); }
  get fee(){ return this.detailFrom.get('fee'); }
  get room_no(){ return this.detailFrom.get('room_no'); }
  get ward_num(){ return this.detailFrom.get('ward_num'); }
  get appoints_per_slot(){ return this.detailFrom.get('appoints_per_slot'); }

}

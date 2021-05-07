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

  errmsg:string="";
  successMsg:string="";
  docForm:FormGroup;
  docList;
  slotForm:FormGroup;
  slotList;
  DOC;
  SLOT;

  constructor(
    private api:ApiService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.api.get("/doctors", {}).subscribe(data => {
      console.log(data);
      this.docList = data;

      this.docForm = this.fb.group({
        doctor:["",[
          Validators.required,
        ]]
      });
    })
  }

  next(){
    console.log(this.doctor.value);
    let docid = this.doctor.value["id"];
    this.api.get(`/doctor/freeslots/${docid}`, {}).subscribe(data => {
      this.slotList = data;
      this.slotForm = this.fb.group({
        slot:["", [
          Validators.required,
        ]]
      })
    })
  }

  book(){
    let slot = this.slot.value;
    console.log(slot);
    this.DOC = this.doctor.value;
    this.SLOT = slot;
  }

  checkout(){
    this.api.post("/patient/bookAppoint", {}, {}).subscribe( res => {
      this.errmsg = res["error"];
      this.successMsg = res["msg"];
    })
  }

  get doctor(){ return this.docForm.get('doctor');}
  get slot(){ return this.slotForm.get('slot');}

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errmsg:string="";
  genderVal:string[] = ["male", "female", 'other'];
  regForm:FormGroup;

  constructor(private auth:AuthService,
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
    const phone = this.fb.group({
      country_code:['+91', [
        Validators.required,
        Validators.pattern('^\\+[0-9]{2}$')
      ]],
      phone:['',[
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]]
    });

    this.regForm = this.fb.group({
      phone:phone,
      password:["",[
        Validators.required,
        Validators.minLength(6)
      ]],
      name: [''],
      dob: ['', [
        Validators.required,
      ]],
      gender: ['', [
        Validators.required
      ]],
      account_info: [''],
      address: [''],
      district: [''],
      state: [''],
      country: [''],
      height: [''],
      weight: ['']
    });
  }

  register(){
    let phone = this.ccode.value + this.phone.value;
    this.auth.register("/patient/register", {
      phone:phone, 
      password:this.password.value,
      name: this.name.value,
      dob: this.dob.value,
      gender: this.gender.value,
    })
    .subscribe((res) => {
      console.log(res);
      this.errmsg = res['error'];
    })
  }

  get ccode(){ return this.regForm.get('phone.country_code'); }
  get phone(){ return this.regForm.get('phone.phone'); }

  get password(){ return this.regForm.get('password'); }
  get name(){ return this.regForm.get('name'); }
  get dob(){ return this.regForm.get('dob'); }
  get gender(){ return this.regForm.get('gender'); }

}

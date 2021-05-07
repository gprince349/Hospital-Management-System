import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  patientStr:string = "patient";
  staffStr:string = "staff";
  userType:string = this.patientStr;
  other:string = this.staffStr;
  errmsg:string = "";
  loginForm:FormGroup;

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

    this.loginForm = this.fb.group({
      phone:phone,
      password:["",[
        Validators.required,
        Validators.minLength(6)
      ]]
    });

  }

  login(){
    let phone = this.ccode.value + this.phone.value;
    this.auth.login(`/${this.userType}/login`, phone, this.password.value)
    .subscribe((res) => {
      console.log(res);
      this.errmsg = res['error'];
    })
  }

  toggleUserType(){
    let t = this.userType;
    this.userType = this.other;
    this.other = t;
  }

  get ccode(){
    return this.loginForm.get('phone.country_code');
  }

  get phone(){
    return this.loginForm.get('phone.phone');
  }

  get password(){
    return this.loginForm.get('password');
  }
}

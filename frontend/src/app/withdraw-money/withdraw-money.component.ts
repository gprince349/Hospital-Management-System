import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {
  curUser:User;
  errmsg:string="";
  successMsg:string="";
  genderVal:string[] = ["male", "female", 'other'];
  addFrom:FormGroup;
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

        this.addFrom = this.fb.group({
          amount:["",[
            Validators.required,
            Validators.pattern('^[0-9]*$')
          ]]
        });
      }
    })
  }

  withdraw(){
    this.api.post("/patient/withdrawMoney", {
      amount:this.amount.value
      }, {})
      .subscribe((res) => {
      console.log(res);
      this.errmsg = res['error'];
      this.successMsg = res["msg"];
      })
  }

  get amount() { return this.addFrom.get('amount'); }

}

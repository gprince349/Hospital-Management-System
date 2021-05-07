import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  curUser:User;
  menuItems:any;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getCurUser().subscribe( u => {
      if(u instanceof Error){
        console.log(u);
      }else{
        this.curUser = u;
        this.menuItems = this.curUser.getMenu();        
      }
    })
  }



}

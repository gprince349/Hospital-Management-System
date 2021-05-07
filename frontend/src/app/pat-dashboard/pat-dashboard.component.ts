import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-pat-dashboard',
  templateUrl: './pat-dashboard.component.html',
  styleUrls: ['./pat-dashboard.component.css']
})
export class PatDashboardComponent implements OnInit {
  curUser:User;
  details;
  
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getCurUser().subscribe( u => {
      if(u instanceof Error){
        console.log(u);
      }else{
        this.curUser = u;
        this.details = Object.entries(this.curUser.details);
      }
    })
  }

}

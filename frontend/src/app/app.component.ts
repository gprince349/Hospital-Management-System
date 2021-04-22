import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'IITB Hospital';
  curUser:User;
  isLoggedin:boolean = false;
  private _authSubscription:Subscription;

  constructor(private auth:AuthService){
    this._authSubscription = auth.statusChange.subscribe( val => {
      this.isLoggedin = val;
      auth.getCurUser().subscribe(u => {
        if(u instanceof Error){
          console.log(u);
          this.curUser = undefined;
        }else{
          this.curUser = u;
        }
      });
    })
    auth.isLoggedIn();
  }

  logout(){
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this._authSubscription.unsubscribe();
  }

}

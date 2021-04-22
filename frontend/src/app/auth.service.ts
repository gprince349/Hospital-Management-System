import { User } from './models';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  curUser:User = undefined;
  jwthelper:string = "jwt-helper";
  // store the URL so we can redirect after logging in
  redirectUrl: string = undefined;
  isLoggedin:boolean = false;
  statusChange: Subject<boolean> = new Subject<boolean>();


  constructor(private router:Router, private api:ApiService) { }

  // Do login a after successful login goto redirectUrl OR dashboard
  login(path:string, phone:string, passwd:string){
    return this.api.post(path, {phone:phone, password:passwd}, {}).pipe( 
      map( (res) => {
        if(this.isLoggedIn()){
          let url = this.redirectUrl || "/dashboard";
          this.redirectUrl = undefined;
          this.router.navigate([url]);
        }
        return res;
      }));
  }

  logout(){
    this.api.get('/logout', {}).subscribe( data => {
      this.statusChange.next( this.isLoggedin = false );
      this.curUser = undefined;
      this.router.navigate(['/']);
    });
  }

  isLoggedIn():boolean{
    let token = this.readCookie(this.jwthelper);
    if(token){
      let exp = this.decodeJWT(token).exp;
      let cur_t = Date.now()/1000;
      if(cur_t < exp){
        this.statusChange.next( this.isLoggedin = true);
        return true;
      }
    }
    this.statusChange.next( this.isLoggedin = false);
    return false;
  }

  getCurUser(){
    if(this.isLoggedin){
      if(this.curUser){
        return of(this.curUser);
      }else{
        return this.api.get("/curUserDetails", {}).pipe(
          map(x => {
            if(x["error"]){
              return Error(x["error"]);
            }
            this.curUser = new User(x);
            return this.curUser;
          }));
      }
    }else{
      return of(undefined);
    }
  }

  getTokenData(){
    let token = this.readCookie(this.jwthelper);
    if(token){
      return this.decodeJWT(token);
    }
    return undefined;
  }

  decodeJWT(token:string){
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.log("authService: decodeJWT:", e);
      return undefined;
    }
  }

  readCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-doc-appoints',
  templateUrl: './doc-appoints.component.html',
  styleUrls: ['./doc-appoints.component.css']
})
export class DocAppointsComponent implements OnInit {

  appoints:Object;
  errMsg:string="";

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.get("/doctor/appoints", {}).subscribe(data => {
      if(data["error"]){
        this.errMsg = data["error"];
      }else{
        this.appoints = data;
      }
    })
  }

  markComplete(id){

  }
  add_presc(id){

  }
  cancel(id){
    
  }

}

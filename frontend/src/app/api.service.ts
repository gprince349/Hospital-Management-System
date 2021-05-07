import { Injectable } from '@angular/core';
import { baseUrl } from './constants';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get(path:string, options){
    options["withCredentials"]=true;
    return this.httpClient.get(baseUrl+path, options)
  }

  post(path:string, data:Object, options){
    options["withCredentials"]=true;
    return this.httpClient.post(baseUrl+path, data, options)
  }

}

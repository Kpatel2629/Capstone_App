import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule ,HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { resolve } from 'url';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page {

  public logindata:any = { };

 
  constructor(public http:Http  ) {
    
  }

  //get all users
  getUsers() {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000'+'/users/1').subscribe(data => {
        console.log(data.json().data);
      }, err => {
        console.log(err);
      });
    });
  }  




   users = JSON.stringify( {
      first_name : this.logindata.username,
      last_name : this.logindata.username,
      phonenumber: "9909817814",
      address : this.logindata.address
  });

 
  
postUsers(){

  return new Promise(resolve => {
    
    this.http.post('http://localhost:3000'+'/users',{user: this.users}).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  });      
}




  async loginClick(){
   
    this.postUsers();
  

  }
  }
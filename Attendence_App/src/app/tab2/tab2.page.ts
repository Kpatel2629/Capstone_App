import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page {
  
  public userName:string;
  public password:any;

  constructor(public router:Router,public http:Http ) {}

  ToRegisterClick(){
    this.router.navigate(['/tabs/tab1'])
  }

  checkUser(userName){
    //the code of checking if username exist or not
    return new Promise<any>((resolve,reject) => {
      this.http.get('http://localhost:3000'+'/students/'+ userName).subscribe(data => {
        resolve(data.json().data)
      }, err => {
        console.log(err);
      });
    });
  }

  loginClick(){ 
    this.checkUser(this.userName).then((value) => {
      console.log(value);
    });
  }
}
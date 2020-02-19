import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Router } from '@angular/router';
import { Http } from '@angular/http';


import { from } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {

  
public user;
public errorMessege:string;
public className:string;
public instructor:Number;
public firstName:string;

constructor(public router:Router,public http:Http,public storage:Storage ) {}

  ngOnInit() {
   //  this.user = this.storage.get('userDetails');
     
     this.storage.get('userDetails').then((parameter)=>{
      this.user = parameter;
      this.instructor = parameter.instructor_id;
      this.firstName = parameter.first_name;
      console.log(this.user)
    })
   }

   addClass(newClass){
    return new Promise(resolve => {
      this.http.post('http://localhost:3000'+'/class',{classes: newClass}).subscribe(data => {
        this.errorMessege = JSON.stringify(data.json().message);
      }, err => {
        console.log(err);
      });
     });  
  }

   KClick(){
     console.log(this.user.username);
   }

   addClassClick(){
    let classObject = {
      className : this.className,
      Instructor: this.instructor
    }
    this.addClass(classObject);
    console.log(classObject.Instructor)
   }
}

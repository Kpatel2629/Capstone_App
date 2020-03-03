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
data:any = [];


constructor(public router:Router,public http:Http,public storage:Storage ) {}

  ngOnInit() {
   //  this.user = this.storage.get('userDetails');     
     this.storage.get('userDetails').then((parameter)=>{
      this.user = parameter;
      this.instructor = parameter.instructor_id;
      this.firstName = parameter.first_name;
      console.log(this.user);
      this.addtoList(this.instructor);
    })
   }

   //add a new class
   addClass(newClass){
    return new Promise(resolve => {
      this.data = [];
      this.http.post('http://localhost:3000'+'/class',{classes: newClass}).subscribe(data => {
        this.errorMessege = JSON.stringify(data.json().message);
      }, err => {
        console.log(err);
      });
     });  
   }

    //Accept a instructor id as parameter
  public retrieveClass(instructorId){
    return new Promise<any>((resolve,reject) => {
      this.data = [];
      this.http.get('http://localhost:3000'+'/getClasses/'+instructorId+'').subscribe(data => {
      resolve(data.json().data)
      }, err => {
        console.log(err);
      });
    });
  }

  deleteClass(className){
    return new Promise<any>((resolve,reject) => {
      this.http.delete('http://localhost:3000'+'/class/'+className+'').subscribe(data => {
      resolve(data.json().message)
      }, err => {
        console.log(err);
      });
    });
  }
  
  deleteClassClick(){
    this.deleteClass(this.className).then((value)=>{
      this.addtoList(this.instructor);
    })
  }

   //A function that load array of classes
   showClassClick(){
     this.retrieveClass(this.instructor).then((value)=>{
       console.log(value);
     })
   }


   //click function that select class element and save it to localstorage 
   classSelectClick(event : any){
      this.storage.set('className',event.target.innerText).then(()=>
      this.router.navigate(['/tabs/barcode-page']))
    
   }

  //a function that load data to listview
  addtoList(instructorid){
    this.retrieveClass(instructorid).then((value) => {
      for(var i = 0; i < value.length;i++){
        var classes = value[i].class_name;
        this.data.push(classes);
      }
    })
  }
  
   addClassClick(){
    //a classObject 
    let classObject = {
      className : this.className,
      Instructor: this.instructor
    }
    this.addClass(classObject);
   
   this.addtoList(this.instructor);
   }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page {
  
  public userName:string;
  public password:any;
  public IsInstructor:Boolean ;
  public errorMessege:string;

  constructor(public router:Router,public http:Http,public storage:Storage ) {}

  ToRegisterClick(){
    this.router.navigate(['/tabs/tab1'])
  }
  
  checkStudent(userObj){
    //the code of checking if username exist or not
    return new Promise<any>((resolve,reject) => {
      this.http.post('http://localhost:3000'+'/Checkstudent',{userObject:userObj}).subscribe(data => {
      resolve(data.json().data)
      }, err => {
        console.log(err);
      });
    });
  }

  checkInstructor(userObj){
    //the code of checking if username exist or not
    return new Promise<any>((resolve,reject) => {
      this.http.post('http://localhost:3000'+'/Checkinstructor',{userObject:userObj}).subscribe(data => {
      resolve(data.json().data)
      }, err => {
        console.log(err);
      });
    });
  }
  
  //A function which decide which Promise to return
  public IsInRole(IsInstructor) {
    //A user Object
    let user =JSON.stringify({
      userName : this.userName,
      password:this.password
    });
  
    return IsInstructor ? this.checkInstructor(user) : this.checkStudent(user);
  }


  async loginClick(){
    
    this.errorMessege = "";

    if(this.userName ==null || this.userName == ""){
      this.errorMessege += "Username can not be empty \n";
    }
    else if(this.password == "" || this.password == null){
      this.errorMessege += "Password can not be empty \n";
    } else{

      if(this.IsInstructor){
        this.IsInRole(this.IsInstructor).then((value) => {
           this.storage.set('userDetails',value).then(()=>{
           if(!value){
             this.errorMessege += "Please Create an Account or Login with different password";
           }else{ this.router.navigate(['/tabs/tab3'])}
          })
         });
       }else{
         this.IsInRole(this.IsInstructor).then((value) => {
           this.storage.set('studentDetails',value).then(()=> {   
            if(!value){
             this.errorMessege += "Please Create an Account or Login with different password";
           }else{ this.router.navigate(['/tabs/student-barcode'])}
          })});
       }  
    }
   //A user object with UserName and password
  
  }
}
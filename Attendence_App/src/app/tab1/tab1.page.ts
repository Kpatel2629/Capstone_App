import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule ,HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import * as validator from '../../../../Attendence_App/validation.js'
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  //Properties
  public logindata:any = {};
  public errorMessege:any;
  public IsInstructor:Boolean ;
  
  constructor(public http:Http,public loadingController: LoadingController,public BarcodeScan:BarcodeScanner,
  public router:Router) 
  {
  
  }

  //Validate all fields and return boll
  ValidateFields(){ 
     let isvalidatedFields = false;

      this.errorMessege = "";

      if(validator.ValidatePassword(this.logindata.password) != true){
        this.errorMessege += validator.ValidatePassword(this.logindata.password)
      }
      else{
        isvalidatedFields = true;
      }

      if(validator.needPassword(this.logindata.password) != true){
        this.errorMessege += validator.needPassword(this.logindata.password)
      }
      else{
        isvalidatedFields = true;
      }

      if(!validator.validateConfirmPassword(this.logindata.password,this.logindata.C_password)){
        this.errorMessege += validator.validateConfirmPassword(this.logindata.password,this.logindata.C_password)
      }else{
        isvalidatedFields = true;
      }

      if(validator.needEmail(this.logindata.password) != true){
        this.errorMessege += validator.needEmail(this.logindata.email)
      }else{
        isvalidatedFields = true;
      }

      if(this.logindata.password !== this.logindata.C_password){
        this.errorMessege += "Please make sure thar password and confirm password match \n";
      }

    if(validator.ValidateEmail(this.logindata.email) !=true ){
     this.errorMessege += validator.ValidateEmail(this.logindata.email) 
    }
    else{
      isvalidatedFields = true;
    }


    if(isvalidatedFields == true){
      this.IsInRole(this.IsInstructor)
    }
    console.log(this.errorMessege);
  }

  
  

//ionic Loading
  async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Loading....',
    duration:1500
  });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  //A function that return promise which insert a new student or instructor into database
  registerStudent(student){
  return new Promise(resolve => {
    this.http.post('http://localhost:3000'+'/student',{users: student}).subscribe(data => {
    //  this.errorMessege = JSON.stringify(data.json().message);
    }, err => {
      console.log(err);
    });
   });      
  }

registerInstructor(instructor){

  return new Promise(resolve => {
    this.http.post('http://localhost:3000'+'/instructor',{users: instructor}).subscribe(data => {
      this.errorMessege = JSON.stringify(data.json().message);
    }, err => {
      console.log(err);
    });
   });  
}

  async ToLoginClick(){
    this.router.navigate(['/tabs/tab2'])
  }

  // a function which decide a user is instructor or student and return a promise
  public IsInRole(IsInstructor) {
    //A user Object
    let userObject =JSON.stringify({
      firstName : this.logindata.firstName,
      lastName: this.logindata.lastName,
      userName:this.logindata.userName,
      email:this.logindata.email,
      password: this.logindata.password,
    });
    //returns promise according to the student or instructor
    return IsInstructor ? this.registerInstructor(userObject) : this.registerStudent(userObject);
  }
    
  //a click event that call IsInRole function And add to it to database
  async registerClick(){
 //  this.IsInRole(this.IsInstructor)
  this.ValidateFields();
  }
}
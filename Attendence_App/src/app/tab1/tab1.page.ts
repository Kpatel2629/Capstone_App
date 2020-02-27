import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule ,HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  //Properties
  public logindata:any = {};
  public errorMessege:string;
  public IsInstructor:Boolean ;
  
  constructor(public http:Http,public Store:AngularFirestore,public loadingController: LoadingController,
  public router:Router) 
  {
   
  }


  //try for firestore
  TryFirestore(data) {
    return new Promise<any>((resolve, reject) => {
        this.Store
            .collection("Classes/").doc("class_id/").set(data)
            .then(res => {}, err => reject(err));
    });
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


  //A value that to be fetched to firestore
  k = { barcode_id : "Value of barcode"};

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

    return IsInstructor ? this.registerInstructor(userObject) : this.registerStudent(userObject);
  }
    
  async registerClick(){
    
   //this.presentLoading();
 // this.TryFirestore(this.k);
  this.IsInRole(this.IsInstructor)
  
  console.log(this.IsInstructor)
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule ,HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  public logindata:any = {};
  public errorMessege:string;
  
  constructor(public http:Http,public Store:AngularFirestore,public loadingController: LoadingController ) {     
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

  //try for firestore
  TryFirestore(data) {
    return new Promise<any>((resolve, reject) =>{
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
  postUsers(person){
  return new Promise(resolve => {
    this.http.post('http://localhost:3000'+'/student',{users: person}).subscribe(data => {
      this.errorMessege = JSON.stringify(data.json().message);
    }, err => {
      console.log(err);
    });
   });      
  }



  //A value that to be fetched to firestore
  k = { barcode_id : "Value of barcode"};

  async registerClick(){
   
    //A user Object
    let k =JSON.stringify({
      firstName : this.logindata.firstName,
      lastName: this.logindata.lastName,
      userName:this.logindata.userName,
      email:this.logindata.email,
      password: this.logindata.password,
      IsInstructor:this.logindata.IsInstructor
    });

   // this.presentLoading();
   this.postUsers(k);
  //this.TryFirestore(this.k);
  }
  }
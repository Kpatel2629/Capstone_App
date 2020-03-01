import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http';

@Component({
  selector: 'app-barcode-page',
  templateUrl: './barcode-page.page.html',
  styleUrls: ['./barcode-page.page.scss'],
})


export class BarcodePagePage  {

  public className:string;
  public student_email:string;
  public createdCode:any = null;

  constructor(public http:Http,public Store:AngularFirestore,public storage:Storage) { }

  ngOnInit() {
    //  this.user = this.storage.get('userDetails');     
      this.storage.get('className').then((parameter)=>{
      this.className = parameter;
       console.log(parameter);
     
     })
    }


    //try for firestore
  sendqrData_firestore(data,className) {
    return new Promise<any>((resolve, reject) => {
        this.Store
            .collection("Classes/").doc( className+ "/").set(data)
            .then(res => {}, err => reject(err));
    });
  }

  //To add a new student to class
  addNewStudent(studentObj){
    return new Promise(resolve => {
      this.http.post('http://localhost:3000'+'/addStudentToclass',{studentObj: studentObj}).subscribe(data => {
      console.log(data.json())
      }, err => {
        console.log(err);
      });
     });  
  }

    //Generate a random Number 
    getRandom_Barcode(maxNumber){
      return Math.floor(Math.random() * Math.floor(maxNumber))
    }

    addStudent(){

      //Object that will ber posted to server (API)
      let studentObj = {
        studentEmail : this.student_email ,
        className : this.className
      }
      this.addNewStudent(studentObj);

    }


    CraeteBarcode(){
      this.createdCode =JSON.stringify(this.getRandom_Barcode(1000000000));
      console.log(this.createdCode);

     const class_data= {
        gereted_code : this.createdCode
      }

      this.sendqrData_firestore(class_data , this.className)
    }
}

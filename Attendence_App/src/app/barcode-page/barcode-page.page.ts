import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barcode-page',
  templateUrl: './barcode-page.page.html',
  styleUrls: ['./barcode-page.page.scss'],
})


export class BarcodePagePage  {

  public className:string;
  public student_email:string;
  public createdCode:any = null;
  data:any = [];

  constructor(public http:Http,public Store:AngularFirestore,
    public router:Router,public storage:Storage) { }

  ngOnInit() {
    //  this.user = this.storage.get('userDetails');     
      this.storage.get('className').then((parameter)=>{
      this.className = parameter;
       console.log(parameter);
       this.addtoList(this.className);
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

  //get the data from database
  StudentofClass(className){
    this.data = [];
    return new Promise<any>((resolve,reject) => {
      this.http.get('http://localhost:3000'+'/StudentofClass/'+className+'').subscribe(data => {
      resolve(data.json().data)
      }, err => {
        console.log(err);
      });
    });
  }
  
  //load data to list from database
  addtoList(className){
    this.StudentofClass(className).then((value) => {
      for(var i = 0; i < value.length;i++){
        var students = { name : value[i].first_name,
        studentId: value[i].student_id};
        this.data.push(students);
      }
    })
  }

  //To add a new student to class
  addNewStudent(studentObj){
    return new Promise(resolve => {
      this.http.post('http://localhost:3000'+'/addStudentToclass',{studentObj: studentObj}).subscribe(data => {
      console.log(data.json())
      this.addtoList(this.className);
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
      //Object that will be posted to server (API)
      let studentObj = {
        studentEmail : this.student_email ,
        className : this.className
      }
      this.addNewStudent(studentObj);
    }

    //remove student from the class
    removeStudent(){
      this.addtoList(this.className);
      let studentObj = {
        studentEmail : this.student_email ,
        className : this.className
      }
      this.removeStudentfromClass(studentObj);
    }

    removeStudentfromClass(studentObj){
      return new Promise(resolve => {
        this.http.post('http://localhost:3000'+'/deleteStudentFromClass',{studentObj: studentObj}).subscribe(data => {
        console.log(data.json())
        this.addtoList(this.className);
        }, err => {
          console.log(err);
        });
       });  
    }

  studentSelectClick(event : any){

    let currentStudent_info = {
      name:event.target.innerText,
      studentId:event.target.id,
      className:this.className
    }
      this.storage.set('current_student_className',currentStudent_info).then(()=>
      this.router.navigate(['/tabs/student-attendence'])
     
    )}

    CraeteBarcode(){
      this.createdCode =JSON.stringify(this.getRandom_Barcode(1000000000));
      console.log(this.createdCode);

     const class_data= {
        genereted_code : this.createdCode,
        students_attended:[]
      }

      this.sendqrData_firestore(class_data , this.className)
    }
}
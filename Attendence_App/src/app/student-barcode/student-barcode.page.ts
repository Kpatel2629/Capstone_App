import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-barcode',
  templateUrl: './student-barcode.page.html',
  styleUrls: ['./student-barcode.page.scss'],
})
export class StudentBarcodePage{

  public firstName:string;
  data:any = [];
  public student:number;
  constructor(public storage:Storage,public http:Http,public router:Router) { }

  ngOnInit() {
    this.storage.get('studentDetails').then((parameter)=>{
       this.student= parameter.student_id;
       this.firstName = parameter.first_name;
       this.addtoList(this.student);
    });
  }

  //save the className to local storage and navigate a user to scan page
  classSelectClick(event : any){
    this.storage.set('StudentclassName',event.target.innerText).then(()=>
    this.router.navigate(['/tabs/student-scan']))
 }

  //retrive student from databse
  public retrieveStudentofClass(student_id){
    return new Promise<any>((resolve,reject) => {
      this.data = [];
      this.http.get('http://localhost:3000'+'/getClassesofStudent/'+student_id+'').subscribe(data => {
      resolve(data.json().data)
      }, err => {
        console.log(err);
      });
    });
  }

   
  //to add class in listview
  addtoList(studentid){
    this.retrieveStudentofClass(studentid).then((value) => {
      for(var i = 0; i < value.length;i++){
        var classes = value[i].class_name;
        this.data.push(classes);
      }
    })
  }

}

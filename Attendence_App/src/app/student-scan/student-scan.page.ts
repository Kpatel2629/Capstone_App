import { Component, OnInit } from '@angular/core';
import{Storage} from'@ionic/storage';
import { from } from 'rxjs';
import { Http } from '@angular/http';

@Component({
  selector: 'app-student-scan',
  templateUrl: './student-scan.page.html',
  styleUrls: ['./student-scan.page.scss'],
})


export class StudentScanPage  {

  public className:string;
  public student:any;
  public attendence:any;

  constructor(public storage:Storage, public http:Http) { }

  ngOnInit() {
    
      this.storage.get('StudentclassName').then((parameter)=>{
         this.className = parameter;
      }); 

      this.storage.get('studentDetails').then((parameter)=>{
        this.student = parameter.student_id;
     });
   
}

//get the attendence of student
getAttendenceOfStudent(studentObj){
  return new Promise(resolve => {
    this.http.post('http://localhost:3000'+'/attendenceOfStudent',{studentObj: studentObj}).subscribe(data => {
    resolve(data.json().data.attendence)
    }, err => {
      console.log(err);
    });
   });  
}

getdata(){
 let studentObj = {
  studentId : this.student,
   className : this.className
 }
 this.getAttendenceOfStudent(studentObj).then((value) =>{
    console.log(value);
 });
}
}

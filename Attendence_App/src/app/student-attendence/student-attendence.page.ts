import { Component, OnInit } from '@angular/core';
import{Storage} from'@ionic/storage';
import { Http } from '@angular/http';

@Component({
  selector: 'app-student-attendence',
  templateUrl: './student-attendence.page.html',
  styleUrls: ['./student-attendence.page.scss'],
})
export class StudentAttendencePage implements OnInit {

  data:any = []

  constructor(private storage:Storage,private http:Http) { }

  ngOnInit() {
    this.storage.get('current_student_className').then((parameter)=>{

      this.className = parameter.className;

      let studentObj = {
         studentId :  parameter.studentId,
         className :  parameter.className,
         name:parameter.name
       }
       
       this.name = parameter.name;

      new Promise(resolve => {
        this.http.post('http://localhost:3000'+'/attendenceOfStudent',{studentObj: studentObj}).subscribe(data => {
         this.attendence =  data.json().data.attendence;
        }, err => {
          console.log(err);
        });
       });  
   });

  }
}

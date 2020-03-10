import { Component, OnInit } from '@angular/core';
import{Storage} from'@ionic/storage';
import { from } from 'rxjs';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-student-scan',
  templateUrl: './student-scan.page.html',
  styleUrls: ['./student-scan.page.scss'],
})


export class StudentScanPage  {

  public className:string;
  public student:any;
  public attendence:string;
  public scannedData:string;
  public barocdeData:any;

   constructor(public storage:Storage, public http:Http,
    public Store:AngularFirestore, public BarcodeScan : BarcodeScanner)
   {
  
   }

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
     this.attendence =  data.json().data.attendence;
    }, err => {
      console.log(err);
    });
   });  
}

   //get the data from google firestore
   getqrData_firestore(className) {

    return new Promise<any>( () => {

       let codeRef = this.Store.collection("Classes/").doc( className);

            codeRef.get().subscribe(doc =>{

              if(!doc.exists)
              {
                console.log('no such document')
              }
              else
              {
                this.barocdeData =  doc.data().gereted_code
              }
            })
       });
  }

  checkCode(){ 
   return this.barocdeData == this.scannedData ? console.log("matched") : console.log("ahhmrhh dosent matched");
  }

//scan the code and saves the value
scanCode(){
    // this.BarcodeScan.scan().then(barcodeData => {
    //   this.scannedData = barcodeData.text;
    // })
this.getqrData_firestore(this.className);
this.checkCode();    
}

getdata(){
 let studentObj = {
  studentId : this.student,
   className : this.className
 }

 this.getAttendenceOfStudent(studentObj).then(() =>{
    console.log(this.attendence)
 });
}
}
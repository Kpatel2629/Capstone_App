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
  public scannedData:number;
  public messege:string;
  public barcodeData:any = null;

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

//Do the attendece of student ,  increament the value of by 1 in database 
DoAttendence(studentObj){

  return new Promise(reject => {
    this.http.post('http://localhost:3000'+'/DoAttendence',{studentObj: studentObj}).subscribe(data => {

     this.messege = data.json().data;

     this.Store
     .collection("Classes/").doc( this.className+ "/").set({students_attended: [this.student], }, { merge: true },)
     .then(res => {console.log(res)}, err => reject(err));

    }, err => {
      console.log(err);
    });
   })
}

   //get the data from google firestore
async getqrData_firestore(className) {

    

        let codeRef = await this.Store.collection("Classes/").doc( className);
            codeRef.get().subscribe(doc =>{
              this.barcodeData = doc.data().genereted_code;
      })
  }

  //to prevent the students who already scanned ( to prevent dupliacate writes to database)
  CheckAlreadyScanned(){

    let studentObj = {
      studentId : this.student,
      className : this.className
     }
     let ifthereStudent;

    return new Promise<any>(() => {
      
        let codeRef = this.Store.collection("Classes/").doc( this.className );
        codeRef.get().subscribe(doc =>{      
            //find the student number in array if found returns true
          ifthereStudent = doc.data().students_attended.find(element => element == this.student)
           ifthereStudent !== this.student && this.scannedData == this.barcodeData ? this.DoAttendence(studentObj): console.log('already scanned');
        })
   })      

}

//scan the code and saves the value
scanCode(){
//     this.BarcodeScan.scan().then(barcodeData => {
//       this.scannedData = barcodeData.text;
//     })
this.getqrData_firestore(this.className)
  this.CheckAlreadyScanned();
}

getdata(){
 let studentObj = {
  studentId : this.student,
   className : this.className
 }

 this.getAttendenceOfStudent(studentObj).then((parameter) =>{
    console.log(this.attendence)
 });
}
}
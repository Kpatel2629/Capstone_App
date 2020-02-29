import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-barcode-page',
  templateUrl: './barcode-page.page.html',
  styleUrls: ['./barcode-page.page.scss'],
})


export class BarcodePagePage  {

  public className:string;
  public student_name:string;
  createdCode = null;

  constructor(public storage:Storage) { }

  ngOnInit() {
    //  this.user = this.storage.get('userDetails');     
      this.storage.get('className').then((parameter)=>{
      this.className = parameter;
       console.log(parameter);
     
     })
    }

    //Generate a random Number 
    getRandom_Barcode(maxNumber){
      return Math.floor(Math.random() * Math.floor(maxNumber));
    }

    CraeteBarcode(){
      this.createdCode =JSON.stringify(this.getRandom_Barcode(1000000000));
      console.log(this.createdCode);
    }


}

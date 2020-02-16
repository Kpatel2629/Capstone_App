import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})



export class Tab2Page {
  
  public userName:string;
  public password:any;

  constructor() {}


  ToRegisterClick(){
    console.log("i am working , come on men")
  }

  loginClick(){
     console.log("login working")
  }


}

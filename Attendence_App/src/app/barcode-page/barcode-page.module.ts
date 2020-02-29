import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';


import { BarcodePagePage } from './barcode-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: BarcodePagePage }]),
    NgxQRCodeModule
  ],
  declarations: [BarcodePagePage]
})
export class BarcodePagePageModule {}

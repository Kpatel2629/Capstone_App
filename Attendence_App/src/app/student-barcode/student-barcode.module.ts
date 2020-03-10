import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentBarcodePage } from './student-barcode.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: StudentBarcodePage}])
  ],
  declarations: [StudentBarcodePage]
})
export class StudentBarcodePageModule {}

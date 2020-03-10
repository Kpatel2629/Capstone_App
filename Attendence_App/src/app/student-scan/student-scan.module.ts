import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentScanPage } from './student-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild([{ path: '', component: StudentScanPage} ]
)
  ],
  declarations: [StudentScanPage]
})
export class StudentScanPageModule {}

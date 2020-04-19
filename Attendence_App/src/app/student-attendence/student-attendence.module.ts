import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { StudentAttendencePage } from './student-attendence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild([{ path: '', component: StudentAttendencePage} ]
)
  ],
  declarations: [StudentAttendencePage]
})
export class StudentAttendencePageModule {}

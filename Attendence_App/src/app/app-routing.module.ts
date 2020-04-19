import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'barcode-page',
    loadChildren: () => import('./barcode-page/barcode-page.module').then( m => m.BarcodePagePageModule)
  },
  {
    path: 'student-barcode',
    loadChildren: () => import('./student-barcode/student-barcode.module').then( m => m.StudentBarcodePageModule)
  },
  {
    path: 'student-scan',
    loadChildren: () => import('./student-scan/student-scan.module').then( m => m.StudentScanPageModule)
  },
  {
    path: 'student-attendence',
    loadChildren: () => import('./student-attendence/student-attendence.module').then( m => m.StudentAttendencePageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'barcode-page',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../barcode-page/barcode-page.module').then(m => m.BarcodePagePageModule)
          }
        ]
      },
      {
        path: 'student-attendence',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../student-attendence/student-attendence.module').then(m => m.StudentAttendencePageModule)
          }
        ]
      },
      {
        path: 'student-barcode',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../student-barcode/student-barcode.module').then(m => m.StudentBarcodePageModule)
          }
        ]
      },
      {
        path: 'student-scan',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../student-scan/student-scan.module').then(m => m.StudentScanPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

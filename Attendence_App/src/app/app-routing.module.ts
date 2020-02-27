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
    path: 'class-list',
    loadChildren: () => import('./class-list/class-list.module').then( m => m.ClassListPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

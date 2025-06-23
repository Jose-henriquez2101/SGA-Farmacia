import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { WelcomeComponent } from './welcome/welcome.component';


export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/product-list', component: ProductListComponent },
  { path: 'welcome', component: WelcomeComponent },
];

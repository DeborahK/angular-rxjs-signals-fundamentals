import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  { path: 'welcome', component: HomeComponent },
  {
    path: 'products',
    loadComponent: () => import('./products/product-shell/product-shell.component').then(c => c.ProductShellComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart-shell/cart-shell.component').then(c => c.CartShellComponent)
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }];
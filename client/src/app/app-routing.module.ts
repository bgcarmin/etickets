import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule), data: {breadcrumb: 'Store'}},
  {path: 'serverError', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'notFound', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule), data: {breadcrumb: 'Basket'}},
  {path: 'checkout', canActivate: [AuthGuard],
  loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule), data: {breadcrumb: 'Checkout'}},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), data: {breadcrumb: 'Account'}},
  {path: '**', redirectTo: 'notFound', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

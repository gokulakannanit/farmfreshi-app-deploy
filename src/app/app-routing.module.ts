import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./pages/order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'category/:id',
    loadChildren: () =>
      import('./pages/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/check-out/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'success',
    loadChildren: () =>
      import('./pages/success/success.module').then((m) => m.SuccessModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

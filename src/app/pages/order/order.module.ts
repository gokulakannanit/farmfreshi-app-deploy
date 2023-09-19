import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesSharedModule } from 'src/app/common/shared/pages-shared.module';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class OrderRouteModule {}

@NgModule({
  declarations: [OrderComponent],
  imports: [PagesSharedModule, OrderRouteModule],
})
export class OrderModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out.component';
import { PagesSharedModule } from 'src/app/common/shared/pages-shared.module';
import { CheckoutService } from 'src/app/service/checkout.service';
import { PaymentGatewayComponent } from 'src/app/components/payment-gateway/payment-gateway.component';

const routes: Routes = [
  {
    path: '',
    component: CheckOutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class CheckoutRoutingModule {}

@NgModule({
  declarations: [CheckOutComponent, PaymentGatewayComponent],
  providers: [CheckoutService],
  imports: [PagesSharedModule, CheckoutRoutingModule],
})
export class CheckoutModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';
import { AddressFlowComponent } from 'src/app/components/address-flow/address-flow.component';
import { ScheduleDeliveryComponent } from 'src/app/components/schedule-delivery/schedule-delivery.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
@NgModule({
  declarations: [
    ProductCardComponent,
    MessageDialogComponent,
    CarouselComponent,
    AddressFlowComponent,
    ScheduleDeliveryComponent,
  ],
  imports: [SharedModule, RouterModule],
  exports: [
    SharedModule,
    RouterModule,
    MessageDialogComponent,
    ProductCardComponent,
    AddressFlowComponent,
    ScheduleDeliveryComponent,
    CarouselComponent,
  ],
})
export class PagesSharedModule {}

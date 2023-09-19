import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipe/filter.pipe';
import { CartComponent } from '../cart/cart.component';
import { AddCartDirective } from '../directives/add-cart.directive';
import { RemoveCartDirective } from '../directives/remove-cart.directive';
import { AgmCoreModule } from '@agm/core';
import { CitySelectorComponent } from '../city-selector/city-selector.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CartSideBarComponent } from 'src/app/components/cart-side-bar/cart-side-bar.component';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { AddressBookComponent } from 'src/app/components/address-book/address-book.component';
import { LocationComponent } from 'src/app/components/location/location.component';
import { VerifyMobileComponent } from 'src/app/components/verify-mobile/verify-mobile.component';
import { CircleMenuComponent } from 'src/app/components/circle-menu/circle-menu.component';
import { RemoveProductFromCartDirective } from '../directives/remove-product-from-cart.directive';
import { ChangePinComponent } from 'src/app/components/change-pin/change-pin.component';
import { CategoryListComponent } from 'src/app/components/category-list/category-list.component';
import { ShowMapComponent } from 'src/app/components/show-map/show-map.component';

@NgModule({
  declarations: [
    FilterPipe,
    VerifyMobileComponent,
    LocationComponent,
    AddressBookComponent,
    AvatarComponent,
    CitySelectorComponent,
    ChangePinComponent,
    CartComponent,
    AddCartDirective,
    RemoveCartDirective,
    RemoveProductFromCartDirective,
    ShowMapComponent,
    CategoryListComponent,
    OtpInputComponent,
    SidebarComponent,
    CartSideBarComponent,
    CircleMenuComponent,
  ],
  imports: [
    A11yModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule.withConfig({
      useColumnBasisZero: false,
      printWithBreakpoints: ['md', 'lt-lg', 'lt-xl', 'gt-sm', 'gt-xs', 'gt-xs'],
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOOQ3JePVpVpDFBR8cjj2GEO_DDihuE8A',
      libraries: ['places'],
    }),
  ],
  exports: [
    A11yModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    FilterPipe,
    ShowMapComponent,
    ChangePinComponent,
    VerifyMobileComponent,
    CategoryListComponent,
    AvatarComponent,
    LocationComponent,
    AddressBookComponent,
    CitySelectorComponent,
    CartComponent,
    AddCartDirective,
    OtpInputComponent,
    RemoveCartDirective,
    RemoveProductFromCartDirective,
    SidebarComponent,
    AgmCoreModule,
    CartSideBarComponent,
    CircleMenuComponent,
  ],
})
export class SharedModule {}

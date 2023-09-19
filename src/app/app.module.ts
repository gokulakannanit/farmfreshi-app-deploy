import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './common/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { PopoverComponent } from './common/popover/popover.component';
import { LoginComponent } from './components/login/login.component';
import { FilterPipe } from './common/pipe/filter.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    SearchProductsComponent,
    FooterComponent,
    PopoverComponent,
    HeaderComponent,
    LoginComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    OverlayModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [MatDialog, FilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesSharedModule } from 'src/app/common/shared/pages-shared.module';
import { SuccessComponent } from './success.component';
const routes: Routes = [
  {
    path: '',
    component: SuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class SuccessRouteModule {}

@NgModule({
  declarations: [SuccessComponent],
  imports: [PagesSharedModule, SuccessRouteModule],
})
export class SuccessModule {}

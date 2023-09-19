import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesSharedModule } from 'src/app/common/shared/pages-shared.module';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class ProfileRouteModule {}

@NgModule({
  declarations: [ProfileComponent],
  imports: [PagesSharedModule, ProfileRouteModule],
})
export class ProfileModule {}

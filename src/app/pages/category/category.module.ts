import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesSharedModule } from 'src/app/common/shared/pages-shared.module';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
class CategoryRouteModule {}

@NgModule({
  declarations: [CategoryComponent],
  imports: [PagesSharedModule, CategoryRouteModule],
})
export class CategoryModule {}

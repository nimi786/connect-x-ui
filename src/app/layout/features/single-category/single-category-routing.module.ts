import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleCategoryComponent } from './single-category/single-category.component';

const routes: Routes = [
  {
    path: ':subcategory',
    component: SingleCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleCategoryRoutingModule {}

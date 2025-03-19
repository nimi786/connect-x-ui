import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleCategoryRoutingModule } from './single-category-routing.module';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { SharedModule } from '../../../_shared/shared.module';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [SingleCategoryComponent],
  imports: [
    CommonModule,
    SingleCategoryRoutingModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class SingleCategoryModule {}

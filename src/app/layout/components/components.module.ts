import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { CopyRightComponent } from './copy-right/copy-right.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { HammerModule } from '@angular/platform-browser';
import { ItemCardComponent } from './item-card/item-card.component';
import { ReadyToWorkComponent } from './ready-to-work/ready-to-work.component';
import { ViewDetailsCardComponent } from './view-details-card/view-details-card.component';
import { ItemCategoryComponent } from './item-category/item-category.component';

@NgModule({
  declarations: [
    SearchFilterComponent,
    ReadyToWorkComponent,
    CopyRightComponent,
    ItemCardComponent,
    SkeletonLoaderComponent,
    ViewDetailsCardComponent,
    ItemCategoryComponent,
  ],
  imports: [CommonModule, SharedModule, HammerModule],
  exports: [
    SearchFilterComponent,
    CopyRightComponent,
    SkeletonLoaderComponent,
    ReadyToWorkComponent,
    ItemCardComponent,
    ItemCategoryComponent,
  ],
})
export class ComponentsModule {}

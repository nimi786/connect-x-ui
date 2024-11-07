import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { CopyRightComponent } from './copy-right/copy-right.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { HammerModule } from '@angular/platform-browser';
import { ItemCardComponent } from './item-card/item-card.component';
import { ReadyToWorkComponent } from './ready-to-work/ready-to-work.component';
import { PostYourAddComponent } from './post-your-add/post-your-add.component';

@NgModule({
  declarations: [
    SearchFilterComponent,
    ReadyToWorkComponent,
    CopyRightComponent,
    ItemCardComponent,
    SkeletonLoaderComponent,
    PostYourAddComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HammerModule,
  ],
  exports: [
    SearchFilterComponent,
    CopyRightComponent,
    SkeletonLoaderComponent,
    PostYourAddComponent,
    ReadyToWorkComponent,
    ItemCardComponent,
  ],
})
export class ComponentsModule {}

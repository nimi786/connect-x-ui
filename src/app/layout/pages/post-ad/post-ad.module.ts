import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostAdRoutingModule } from './post-ad-routing.module';
import { PostAdComponent } from './post-ad/post-ad.component';
import { SharedModule } from '../../../_shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [PostAdComponent],
  imports: [CommonModule, PostAdRoutingModule, SharedModule, ComponentsModule],
})
export class PostAdModule {}

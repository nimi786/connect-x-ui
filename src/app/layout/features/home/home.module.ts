import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../../_shared/shared.module';
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';

@NgModule({
  declarations: [HomeComponent, ImageUploadComponent],
  imports: [CommonModule, HomeRoutingModule, ComponentsModule, SharedModule],
})
export class HomeModule {}

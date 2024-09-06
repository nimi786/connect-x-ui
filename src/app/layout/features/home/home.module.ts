import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from '../../../_shared/shared.module';
import { ItemCategoryComponent } from './item-category/item-category.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, ItemCategoryComponent],
  imports: [CommonModule, HomeRoutingModule, ComponentsModule, SharedModule],
})
export class HomeModule {}

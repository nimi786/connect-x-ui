import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { SharedModule } from '../../../_shared/shared.module';

@NgModule({
  declarations: [PostListComponent],
  imports: [CommonModule, SharedModule, AccountSettingsRoutingModule],
})
export class AccountSettingsModule {}

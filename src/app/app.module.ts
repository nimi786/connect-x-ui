import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './_shared/shared.module';
import { ComponentsModule } from './layout/components/components.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MainComponent } from './layout/pages/main/main.component';
import { HeaderComponent } from './layout/pages/header/header.component';
import { FooterComponent } from './layout/pages/footer/footer.component';
import { FooterMainComponent } from './layout/pages/footer-main/footer-main.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    FooterMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    NzGridModule,
    FormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

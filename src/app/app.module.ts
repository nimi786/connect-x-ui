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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environment/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoginComponent } from './layout/pages/login/login.component';
import { SignUpComponent } from './layout/pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    FooterMainComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    NzGridModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

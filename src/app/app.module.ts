import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NZ_DATE_CONFIG, NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './_shared/shared.module';
import { ComponentsModule } from './layout/components/components.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MainComponent } from './layout/pages/main/main.component';
import { HeaderComponent } from './layout/pages/header/header.component';
import { FooterComponent } from './layout/pages/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environment/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { provideDatabase, getDatabase } from '@angular/fire/database';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoginComponent } from './layout/pages/login/login.component';
import { SignUpComponent } from './layout/pages/sign-up/sign-up.component';

// service
import { AuthenticationService } from './services/auth/authentication.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DatePipe, registerLocaleData } from '@angular/common';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
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
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
  ],

  providers: [
    DatePipe,
    {
      provide: NZ_DATE_CONFIG,
      useValue: {
        firstDayOfWeek: 1, // week starts on Monday (Sunday is 0)
      },
    },
    { provide: NZ_I18N, useValue: en_US },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AuthenticationService,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

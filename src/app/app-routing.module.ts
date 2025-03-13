import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/pages/main/main.component';
import { ScrollService } from './services/common/scroll-service.service';
import { SignUpComponent } from './layout/pages/sign-up/sign-up.component';
import { LoginComponent } from './layout/pages/login/login.component';

// route guard
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layout/features/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'post-ad',
        loadChildren: () =>
          import('./layout/pages/post-ad/post-ad.module').then(
            (m) => m.PostAdModule
          ),
      },

      {
        path: 'account-settings',
        loadChildren: () =>
          import(
            './layout/features/account-settings/account-settings.module'
          ).then((m) => m.AccountSettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [ScrollService],
  exports: [RouterModule],
})
export class AppRoutingModule {}

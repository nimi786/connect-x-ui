import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/pages/main/main.component';
import { ScrollService } from './services/common/scroll-service.service';
import { SignUpComponent } from './layout/pages/sign-up/sign-up.component';
import { LoginComponent } from './layout/pages/login/login.component';

// route guard
import { AuthGuard } from './guard/auth.guard';
import { AboutUsComponent } from './layout/components/about-us/about-us.component';
import { ContactUsComponent } from './layout/components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
  },

  {
    path: 'contactus',
    component: ContactUsComponent,
  },

  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: '',
    component: MainComponent,
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
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./layout/components/post-ad/post-ad.module').then(
            (m) => m.PostAdModule
          ),
      },

      {
        path: 'account-settings',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import(
            './layout/features/account-settings/account-settings.module'
          ).then((m) => m.AccountSettingsModule),
      },

      {
        path: 'category',
        loadChildren: () =>
          import(
            './layout/features/single-category/single-category.module'
          ).then((m) => m.SingleCategoryModule),
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

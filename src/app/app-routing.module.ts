import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/pages/main/main.component';
import { ScrollService } from './services/common/scroll-service.service';
import { LoginComponent } from './layout/pages/login/login/login.component';

const routes: Routes = [
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
        loadChildren: () =>
          import('./layout/pages/post-ad/post-ad.module').then(
            (m) => m.PostAdModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./layout/pages/sign-up/sign-up.module').then(
            (m) => m.SignUpModule
          ),
      },
      {
        path: 'login',
        component: LoginComponent,
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

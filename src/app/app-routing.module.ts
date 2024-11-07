import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/pages/main/main.component';
import { ScrollService } from './services/common/scroll-service.service';

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
        path: 'sign-up',
        loadChildren: () =>
          import('./layout/pages/sign-up/sign-up.module').then(
            (m) => m.SignUpModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./layout/pages/login/login.module').then(
            (m) => m.LoginModule
          ),
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/sign-up-page/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home-page/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'class',
    loadChildren: () =>
      import('./components/class-page/class.module').then((m) => m.ClassModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./components/tests-page/test.module').then((m) => m.TestModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'class/:id',
    loadChildren: () =>
      import('./components/class-details-page/class-details.module').then(
        (m) => m.ClassDetailsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      // useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

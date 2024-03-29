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
    path: 'test/:id',
    loadChildren: () =>
      import('./components/create-test-page/create-test.module').then(
        (m) => m.CreateTestModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'preview/:id',
    loadChildren: () =>
      import('./components/preview-quiz-page/preview-quiz.module').then(
        (m) => m.PreviewQuizModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings-page/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'configure/:id',
    loadChildren: () =>
      import('./components/configure-quiz-page/configure-quiz.module').then(
        (m) => m.ConfigureQuizModule
      ),
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
    path: 'class/:id/student/:studentId',
    loadChildren: () =>
      import('./components/view-activities-page/view-activities.module').then(
        (m) => m.ViewActivitiesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'analyze/:id',
    loadChildren: () =>
      import('./components/analyze-quiz-page/analyze-quiz.module').then(
        (m) => m.AnalyzeQuizModule
      ),
  },
  {
    path: 'quiz/:token',
    loadChildren: () =>
      import('./components/publish-quiz-page/publish-quiz.module').then(
        (m) => m.PublishQuizModule
      ),
  },
  {
    path: 'quiz-result/:token',
    loadChildren: () =>
      import('./components/quiz-results-page/quiz-results.module').then(
        (m) => m.QuizResultsModule
      ),
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

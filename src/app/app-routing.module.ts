import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/unauth.guard';
import { LoginPageComponent } from './pages/auth/login/login-page.component';
import { RegisterPageComponent } from './pages/auth/register/register-page.component';
import { VerifyEmailPageComponent } from './pages/auth/verify-email/verify-email-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Route[] = [
  {
    canActivate: [authGuard],
    loadChildren: () => import('./pages/chapter/chapter.module').then((m) => m.ChapterModule),
    path: 'chapter'
  },
  {
    canActivate: [authGuard],
    loadChildren: () => import('./emulators/emulators.module').then((m) => m.EmulatorsModule),
    path: 'emulator'
  },
  {
    canActivate: [authGuard],
    component: DashboardComponent,
    path: 'dashboard',
  },
  {
    canActivate: [notAuthGuard],
    component: LoginPageComponent,
    path: 'login',
  },
  {
    canActivate: [notAuthGuard],
    component: RegisterPageComponent,
    path: 'register',
  },
  {
    canActivate: [notAuthGuard],
    component: VerifyEmailPageComponent,
    path: 'verify-email',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

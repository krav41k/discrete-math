import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPageComponent } from './pages/login/login-page.component';

const routes: Route[] = [
  {
    canActivate: [authGuard],
    component: DashboardComponent,
    path: 'dashboard',
  },
  {
    canActivate: [],
    component: LoginPageComponent,
    path: 'login',
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

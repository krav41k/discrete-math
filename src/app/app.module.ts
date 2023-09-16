import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseAuthModule } from './firebase-auth.module';
import { LoginPageComponent } from './pages/auth/login/login-page.component';
import { RegisterPageComponent } from './pages/auth/register/register-page.component';
import { VerifyEmailPageComponent } from './pages/auth/verify-email/verify-email-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialModule } from './shared/material.module';
const pages = [DashboardComponent, LoginPageComponent, RegisterPageComponent, VerifyEmailPageComponent];

@NgModule({
  declarations: [
    AppComponent,
    ...pages,
  ],
  imports: [
    AngularSvgIconModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FirebaseAuthModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

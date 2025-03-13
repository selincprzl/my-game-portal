import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';  // Import your component
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Import RouterModule here

@NgModule({
  imports: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    BrowserModule,
    CommonModule,  // Add CommonModule here
    FormsModule,  // Add FormsModule for two-way data binding
    NgModule,
    RouterModule,
  ],
  providers: [],
})
export class AppModule { }

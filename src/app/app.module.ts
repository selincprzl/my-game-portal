import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';  // Import your component
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AdminDashboardComponent,
    AdminLoginComponent
  
  ],
  imports: [
    BrowserModule,
    CommonModule,  // Add CommonModule here
    FormsModule  // Add FormsModule for two-way data binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

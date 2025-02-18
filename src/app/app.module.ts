import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';  // Import your component
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel binding

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent
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

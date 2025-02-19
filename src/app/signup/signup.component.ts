import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string= '';
  email: string = '';
  emailconfirm: string = '';
  password: string = '';
  passwordconfirm: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  register(): void {
    if (!this.name || !this.email || !this.emailconfirm || !this.password || !this.passwordconfirm) {
      alert('All fields are required.');
      return;
    }
  
    if (this.email !== this.emailconfirm) {
      alert('Emails do not match.');
      return;
    }
  
    if (this.password !== this.passwordconfirm) {
      alert('Passwords do not match.');
      return;
    }
    const isAdmin = false; // Set to true if you want the user to be an admi

  
    this.firebaseService.registerUser(this.email, this.password, this.name)
      .then(() => {
        alert('Signup successful!');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  }
  

  goToLogin(): void {
    this.router.navigate(['/login']); 
}
}

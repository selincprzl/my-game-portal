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
    if (!this.email || !this.password || !this.name) {
      alert('Email and password cannot be empty.');
      return;
    }

    // Create user and store data in Firebase
    this.firebaseService.registerUser(this.email, this.password, this.name)
      .then(() => {
        alert('Signup successful!');
        this.router.navigate(['/login']);  // Redirect to login page after successful signup
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  }

  goToLogin(): void {
    this.router.navigate(['/login']); 
}
}

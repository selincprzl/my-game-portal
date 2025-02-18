import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { FirebaseService } from '../services/firebase.service';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  login(): void {
    // Validate if email and password are not empty
    if (!this.email || !this.password) {
      alert('Email and password cannot be empty.');
      return;
    }

    const auth = getAuth();

    // Use signInWithEmailAndPassword from Firebase Auth (client-side SDK)
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential.user);
        // Handle successful login, such as redirecting the user
      })
      .catch((error) => {
        console.error('Error during login:', error.code, error.message);

        if (error.code === 'auth/invalid-email') {
          alert('Invalid email format');
        } else if (error.code === 'auth/wrong-password') {
          alert('Incorrect password');
        } else if (error.code === 'auth/user-not-found') {
          alert('No user found with this email address.');
        } else {
          alert('Error: ' + error.message);
        }
      });
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);  // Navigate to the signup page
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  adminLogin(): void {
    if (!this.email || !this.password) {
      alert('Email and password cannot be empty.');
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Check if user is an admin
        this.firebaseService.checkIfAdmin(user.uid).then((isAdmin) => {
          if (isAdmin) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            alert('You are not an admin!');
          }
        });
      })
      .catch((error) => {
        console.error('Error during login:', error.code, error.message);
        alert('Error: ' + error.message);
      });
  }
}

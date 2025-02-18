import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  // Register user and check if they are a hardcoded admin
  registerUser(email: string, password: string, name: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const isAdmin = this.isHardcodedAdmin(email); // Check if the user is an admin
        this.saveUserData(user.uid, name, email, isAdmin);
      })
      .catch((error) => {
        console.error('Error during user registration:', error);
        throw new Error(error.message);
      });
  }

  // Save user data in Firebase Realtime Database
  private saveUserData(uid: string, name: string, email: string, isAdmin: boolean): void {
    set(ref(database, 'users/' + uid), {
      name: name,
      email: email,
      isAdmin: isAdmin,  // Store isAdmin property in the database
      createdAt: new Date().toISOString()
    });
  }

  // Login user
  loginUser(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Check if a user is an admin
  checkIfAdmin(uid: string): Promise<boolean> {
    const userRef = ref(database, 'users/' + uid);
    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        return userData.isAdmin || false;  
      }
      return false;
    }).catch((error) => {
      console.error('Error checking admin status:', error);
      return false;
    });
  }

  // Helper function to check if an email belongs to a hardcoded admin
  private isHardcodedAdmin(email: string): boolean {
    const adminEmails = ["usama@usama.dk", "martin@martin.dk", "selin@selin.dk"];
    return adminEmails.includes(email);
  }
}

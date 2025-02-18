import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { environment } from '../environments/environment';
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // This will return the Auth instance
  getAuthInstance() {
    return auth;
  }

  // Register user with Firebase Authentication
  registerUser(email: string, password: string, name:string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return this.saveUserData(user.uid, email, name);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  // Save user data to Firebase Realtime Database
  private saveUserData(uid: string, email: string, name: string): Promise<void> {
    return set(ref(database, 'users/' + uid), {
      name: name,
      email: email,
      createdAt: new Date().toISOString()
    });
  }

  // Login method (example)
  loginUser(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(auth, email, password);
  }
}

import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get, update } from 'firebase/database';
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
  currentUser: any = null;

  constructor() {
    // Listen for auth state changes
    this.listenToAuthStateChanges();
  }

  // Register user
  registerUser(email: string, password: string, name: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const isAdmin = FirebaseService.isHardcodedAdmin(email);
        return this.saveUserData(user.uid, name, email, isAdmin).then(() => ({ uid: user.uid, isAdmin })); 
      });
  }

  // Save user data
  private saveUserData(uid: string, name: string, email: string, isAdmin: boolean): Promise<void> {
    return set(ref(database, 'users/' + uid), {
      name,
      email,
      isAdmin,
      createdAt: new Date().toISOString()
    });
  }

  // Login user
  loginUser(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Get all users
  getAllUsers(): Promise<any[]> {
    const usersRef = ref(database, 'users/');
    return get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        return Object.keys(usersData).map(uid => ({ uid, ...usersData[uid] }));
      }
      return [];
    });
  }

  // Grant admin rights
  grantAdminRights(uid: string): Promise<void> {
    return update(ref(database, 'users/' + uid), { isAdmin: true });
  }

  // Check if user is an admin
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

  // Listen for auth state changes
  private listenToAuthStateChanges() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  // Get current logged-in user
  getCurrentUser() {
    return this.currentUser;
  }

  // Logout function
  logout(): Promise<void> {
    return auth.signOut();
  }

  // Hardcoded superuser
  private static isHardcodedAdmin(email: string): boolean {
    const adminEmails = ["selin@selin.dk"];
    return adminEmails.includes(email);
  }

  // Revoke admin rights
  revokeAdminRights(uid: string): Promise<void> {
    return update(ref(database, 'users/' + uid), { isAdmin: false });
  }

  // Delete user
  deleteUser(uid: string): Promise<void> {
    const userRef = ref(database, 'users/' + uid);
    return set(userRef, null);  // This deletes the user from the database
  }
}

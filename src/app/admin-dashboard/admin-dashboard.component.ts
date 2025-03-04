import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';  // Import FirebaseService
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf and *ngFor

interface User {
  uid: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule
  providers: [FirebaseService],  // Provide FirebaseService here
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  users: User[] = [];  // Define the type for the users array
  isLoading = true;  // To show loading state

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.fetchUsers();  // Fetch users on component initialization
  }

  // Fetch users from Firebase Realtime Database
  async fetchUsers() {
    this.users = await this.firebaseService.getAllUsers(); // Use getAllUsers
    this.isLoading = false;
  }

  // Grant admin rights to a user
  async grantAdminRights(userId: string) {
    await this.firebaseService.grantAdminRights(userId);
    this.fetchUsers();  // Refresh the user list after granting admin rights
  }

  async deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      await this.firebaseService.deleteUser(userId);
      this.fetchUsers();  // Refresh the user list after deleting the user
    }
}
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,  // If you're using standalone components, make sure it's set to true
  imports: [CommonModule, RouterModule],  // Add RouterModule here as well
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  isAdminRoute(): boolean {
    const adminRoutes = [
      '/admin-dashboard',
      '/admin-chat',
      '/admin-games',
      '/admin-leaderboard'
    ];
    return adminRoutes.includes(this.router.url);
  }
}

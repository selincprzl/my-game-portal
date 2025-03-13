import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service'; // Make sure this is correct
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';  // Import CommonModule for directives like *ngIf
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, CommonModule, NavbarComponent],  // Add CommonModule here
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar = true;

  constructor(private router: Router) {
    router.events.subscribe(() => {
      const noNavbarRoutes = ['/', '/login', '/admin-login', '/home', '/signup' ];
      this.showNavbar = !noNavbarRoutes.includes(this.router.url);
    });
  }
}
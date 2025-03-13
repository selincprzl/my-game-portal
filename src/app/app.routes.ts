import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';  
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { AdminGamesComponent } from './admin-games/admin-games.component'; 
import { AdminLeaderboardComponent } from './admin-leaderboard/admin-leaderboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: DashboardComponent },  // New route
  { path: 'admin-chat', component: AdminChatComponent },  
  { path: 'admin-games', component: AdminGamesComponent },  
  { path: 'admin-leaderboard', component: AdminLeaderboardComponent },  






 
];

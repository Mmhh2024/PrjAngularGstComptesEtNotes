import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Utilisateur } from '../model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit  {
  isLogged: boolean = false;
  user?: Utilisateur;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    this.authService.currentUser.subscribe(user => {
      //this.isLogged = !user;
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['/home']);
  }

  showUtilisateur(): string {
    const user = this.authService.getUser();
    return user ? user.name : '';
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
}

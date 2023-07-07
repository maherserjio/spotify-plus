import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _loginService: LoginService,
    private router: Router
  ) {
    this._authService.removeTokenSettings();
    this.subScribeToRouterEvents();
  }

  subScribeToRouterEvents(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('#')) {
          this.onAccessTokenReceived(event);
        }
      }
    });
  }

  onAccessTokenReceived(event: NavigationEnd): void {
    const token = this.parseToken(event);
    this._authService.setTokenSettigns(token);
    this._authService.handleTokenExpiration();
    this.router.navigate(['/artist']);
  }

  parseToken(event: NavigationEnd): any {
    return JSON.parse(
      '{"' +
        decodeURI(
          event.url.replace(/&/g, '","').replace(/=/g, '":"').slice(2)
        ) +
        '"}'
    );
  }

  onLogin(): void {
    this._loginService.requestAccessToken().subscribe({
      next: (response: any) => {},
      error: (error) => {
        window.location = error.url;
      },
    });
  }
}

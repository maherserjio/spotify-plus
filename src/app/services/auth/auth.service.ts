import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IToken } from 'src/app/login/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router) {}

  isAuthenticated(): boolean {
    this.handleTokenExpiration();
    const access_token = localStorage.getItem('access_token');
    return access_token ? true : false;
  }

  handleTokenExpiration(): void {
    const myInterval = setInterval(() => {
      let token_expiry_new = 0;
      let token_expiry = localStorage.getItem('expires_in');
      token_expiry_new = +token_expiry! - 1;
      localStorage.setItem('expires_in', String(token_expiry_new));
      const expires_in = localStorage.getItem('expires_in');
      if (+expires_in! <= 0) {
        this.removeTokenSettings();
        this._router.navigate(['/login']);
        clearInterval(myInterval);
      }
    }, 1000);
  }

  setTokenSettigns(token: IToken): void {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('token_type', token.token_type);
    localStorage.setItem('expires_in', String(token.expires_in));
    localStorage.setItem('state', token.state);
  }

  removeTokenSettings(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('state');
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/app/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  state = this.generateRandomString(16);

  constructor(private apiService: ApiService) {}

  requestAccessToken(): Observable<unknown> {
    const url = env.authorizeTokenBaseUrl + '/authorize';
    const queryParams = `?response_type=token&client_id=${env.client_id}&scope=${env.scope}&redirect_uri=${env.redirect_uri}&state=${this.state} `;
    return this.apiService.get<any>(url + queryParams).pipe(
      catchError((error) => {
        if (error.status === 200) {
          window.location = error.url;
        } else {
          return error;
        }
      })
    );
  }

  generateRandomString(randomLength: number): string {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedString = '';
    for (let index = 0; index < randomLength; index++) {
      generatedString += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return generatedString;
  }
}

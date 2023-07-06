import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL = '';

  constructor(private _http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public get<T>(url: string, withAuthorization?: boolean): Observable<any> {
    if (withAuthorization) {
      const header = this._prepareHeaders(true);
      return this._http.get<T>(url, { headers: header });
    }
    return this._http.get<T>(url, {headers: this.httpOptions.headers});
  }

  public post<T>(url: string, body: any): Observable<any> {
    const header = this._prepareHeaders(false);
    return this._http
      .post<T>(`${this.apiURL}/${url}`, JSON.stringify(body), {
        headers: header,
        observe: 'response',
      })
      .pipe(
        map((res: any) => res.body),
        catchError((error) => {
          return error;
        })
      );
  }

  private _prepareHeaders(urlEncoded: boolean): HttpHeaders {
    const token_type = localStorage.getItem('token_type');
    const accessToken = localStorage.getItem('access_token');
    const headersParams = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: token_type + ' ' + accessToken,
    };
    if (urlEncoded) {
      headersParams['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return new HttpHeaders(headersParams);
  }
}

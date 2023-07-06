import { Injectable } from '@angular/core';
import { env } from 'src/app/environments/environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { IGetArtists } from './artist.interface';
import { FormGroup } from '@angular/forms';
import { createStore, withProps } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private _apiService: ApiService) {}

  artistRegistrationStore = createStore(
    { name: 'registrationForm' },
    withProps<any>({ formData: null })
  );

  getArtistsBySearchTerm(
    searchTerm: string,
    offset?: number,
    limit?: number
  ): Observable<IGetArtists> {
    const url =
      env.spotifyApiBaseUrl +
      `/search?query=${searchTerm}&type=artist&offset=${offset}&limit=${limit}`;
    return this._apiService.get(url, true);
  }

  getArtistStarRating(popularity: number): number {
    let starRating: number;
    if (popularity >= 0 && popularity <= 20) {
      starRating = 1;
    } else if (popularity >= 21 && popularity <= 40) {
      starRating = 2;
    } else if (popularity >= 41 && popularity <= 60) {
      starRating = 3;
    } else if (popularity >= 61 && popularity <= 80) {
      starRating = 4;
    } else {
      starRating = 5;
    }
    return starRating;
  }

  validateFormFields(form: FormGroup): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      control!?.markAsTouched({ onlySelf: true });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ArtistService } from './artist.service';
import {
  IArtists,
  IGetArtists,
  IRefactoredArtistsDetails,
} from './artist.interface';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  offset = 0;
  limit = 20;
  searchTerm!: string;
  errorMessage!: string;
  isArtistsFound = true;
  isSomethingWentWrong = false;
  artists!: IArtists;
  showLoading!: boolean;
  refactoredArtistsDetails: IRefactoredArtistsDetails[] = [];
  constructor(private _artistService: ArtistService) {}

  ngOnInit(): void {}

  onSearchSubmit(searchTerm: string): void {
    this.offset = 0;
    this.searchTerm = searchTerm;
    this.getArtists();
  }

  getArtists(): void {
    this.showLoading = true;
    this._artistService
      .getArtistsBySearchTerm(this.searchTerm, this.offset, this.limit)
      .subscribe({
        next: (response: IGetArtists) => {
          this.artists = response.artists;
          this.checkArtistsAvailability();
          this.buildRefactoredArtistDetails();
          this.showLoading = false;
        },
        error: (error) => {
          // error handling goes here
          this.showLoading = false;
          this.isSomethingWentWrong = true;
        },
      });
  }

  onNextClick(): void {
    this.offset += 20;
    this.getArtists();
  }

  onPrevClick(): void {
    this.offset -= 20;
    this.getArtists();
  }

  checkArtistsAvailability(): void {
    this.artists.items.length > 0
      ? (this.isArtistsFound = true)
      : (this.isArtistsFound = false);
  }

  buildRefactoredArtistDetails(): void {
    this.refactoredArtistsDetails = [];
    for (let item of this.artists.items) {
      this.refactoredArtistsDetails.push({
        image: item.images[0],
        name: item.name,
        albumsUrl: item.external_urls.spotify,
        followers: item.followers.total,
        stars: this._artistService.getArtistStarRating(item.popularity),
      });
    }
  }

  openArtistRegistrationForm(): void {}
}

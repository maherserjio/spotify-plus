import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeValidator } from 'src/app/custom-validators/age.validator';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-registration-form',
  templateUrl: './artist-registration-form.component.html',
  styleUrls: ['./artist-registration-form.component.scss'],
})
export class ArtistRegistrationFormComponent implements OnInit {
  LEBANESE_PHONE_NUMBER_REGEX =
    '^((\\+961|00961|961)(03|3|70|71|76|78|79|80|81|1|4|5|6|7|8|9)\\d{6}|(03|3|70|71|76|78|79|80|81|01|04|05|06|07|08|09)\\d{6})$';
  registrationForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.createRegistrationForm();
    this._artistService.artistRegistrationStore.subscribe((state) => {
      console.log(state);
    });
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required, AgeValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        Validators.required,
        [Validators.pattern(this.LEBANESE_PHONE_NUMBER_REGEX)],
      ],
      stageName: [''],
      backstory: [''],
      startingDate: [''],
      profilePicture: ['', [Validators.required]],
      albums: new FormArray([
        this.formBuilder.group({
          albumPicture: [''],
          albumDate: [''],
          songs: new FormArray([
            this.formBuilder.group({
              songName: [''],
              songDuration: [''],
            }),
          ]),
        }),
      ]),
    });
  }

  getAlbums(): FormGroup[] {
    let albums = this.registrationForm.get('albums') as FormArray;
    return albums.controls as FormGroup[];
  }

  addAlbum() {
    let albumsArray = this.registrationForm.get('albums') as FormArray;
    let arraylen = albumsArray.length;
    let newAlbum: FormGroup = this.formBuilder.group({
      albumPicture: [''],
      albumDate: [''],
      songs: new FormArray([
        this.formBuilder.group({
          songName: [''],
          songDuration: [''],
        }),
      ]),
    });
    albumsArray.insert(arraylen, newAlbum);
  }

  removeAlbum(i: number): void {
    (this.registrationForm.get('albums') as FormArray).removeAt(i);
  }

  removeSongFromAlbum(i: number): void {
    let albums = this.getAlbums();
    let songs = albums[i].get('songs') as FormArray;
    songs.removeAt(i);
  }

  getAlbumSongs(i: number): FormGroup[] {
    let albums = this.getAlbums();
    let songs = albums[i].get('songs') as FormArray;
    return songs.controls as FormGroup[];
  }

  addSongToAlbum(i: number) {
    let albums = this.getAlbums();
    let songsArray = albums[i].get('songs') as FormArray;
    let arraylen = songsArray.length;
    let newSong: FormGroup = this.formBuilder.group({
      songName: [''],
      songDuration: [''],
    });
    songsArray.insert(arraylen, newSong);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // handle Registration
    } else {
      this._artistService.artistRegistrationStore.update((state) => ({
        ...state,
        form: this.registrationForm.getRawValue(),
      }));
      this._artistService.validateFormFields(this.registrationForm);
    }
  }
}

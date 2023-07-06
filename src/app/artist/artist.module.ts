import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../components/loader/loader.component';
import { MessageComponent } from '../components/message/message.component';
import { ArtistRegistrationFormComponent } from './artist-registration-form/artist-registration-form.component';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistSearchComponent,
    LoaderComponent,
    MessageComponent,
    ArtistRegistrationFormComponent,
  ],
  imports: [CommonModule, ArtistRoutingModule, ReactiveFormsModule],
})
export class ArtistModule {}

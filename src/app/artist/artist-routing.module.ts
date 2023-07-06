import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist.component';
import { ArtistRegistrationFormComponent } from './artist-registration-form/artist-registration-form.component';

const routes: Routes = [
  { path: '', component: ArtistComponent },
  { path: 'registration-form', component: ArtistRegistrationFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRoutingModule {}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRegistrationFormComponent } from './artist-registration-form.component';

describe('ArtistRegistrationFormComponent', () => {
  let component: ArtistRegistrationFormComponent;
  let fixture: ComponentFixture<ArtistRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

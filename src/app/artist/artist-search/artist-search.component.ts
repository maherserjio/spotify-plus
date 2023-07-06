import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.scss'],
})
export class ArtistSearchComponent implements OnInit {
  @Output() searchSubmited = new EventEmitter<string>();
  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createSearchForm();
    this.listenToSearchTermValueChanges();
  }

  listenToSearchTermValueChanges(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      if (value.searchTerm.trim() !== '') {
        this.searchSubmited.emit(value.searchTerm);
      } else {
        return;
      }
    });
  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
    });
  }

  onSubmit(): void {
    const searchTerm = this.searchForm.controls['searchTerm'].value;
    if (searchTerm.trim() !== '') {
      this.searchSubmited.emit(searchTerm);
    } else {
      return;
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.sass',
})
export class SearchFilterComponent {
  searchText!: string;
  @Output() searchProduct = new EventEmitter<string>();

  SearchItems() {
    this.searchProduct.emit(this.searchText);
  }
}

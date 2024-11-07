import { Component } from '@angular/core';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrl: './item-category.component.sass'
})
export class ItemCategoryComponent {
  homeList: any[] = [];
  skeletonList: any[] = [1, 2, 3,4];

  constructor() {
    setTimeout(() => {
      this.homeList = [1, 2, 3,4];
    }, 1000);
  }
}

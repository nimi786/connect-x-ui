import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrl: './item-category.component.sass',
})
export class ItemCategoryComponent {
  homeList: any[] = [];
  skeletonList: any[] = [1, 2, 3, 4];

  constructor() {
    setTimeout(() => {
      this.homeList = [1, 2, 3, 4];
    }, 1000);
  }
}

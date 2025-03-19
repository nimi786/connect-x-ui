import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DataService } from '../../../../services/data.service';
import { Post } from '../../../../model/addPostResponse';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrl: './item-category.component.sass',
})
export class ItemCategoryComponent {
  homeList: any[] = [];
  skeletonList: any[] = [1, 2, 3, 4];
  elcectonicsList: Post[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadItems();
    }, 500);
  }

  loadItems() {
    this.dataService.getItemsByCategory('0').then((electronics) => {
      this.elcectonicsList = electronics; // Assuming each post has an `imageUrl`
      console.log('electronicssssssssssssssssssssssss', this.elcectonicsList);
    });
  }
}

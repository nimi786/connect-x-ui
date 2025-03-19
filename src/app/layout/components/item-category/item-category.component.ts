import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DataService } from '../../../services/data.service';
import { Post } from '../../../model/addPostResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrl: './item-category.component.sass',
})
export class ItemCategoryComponent {
  @Input() subCategory: string = '';
  @Input() isShowAll: boolean = false;
  homeList: any[] = [];
  skeletonList: any[] = [1, 2, 3, 4];
  elcectonicsList: Post[] = [];
  vehiclesList: Post[] = [];
  propertiesList: Post[] = [];
  petsList: Post[] = [];
  toysList: Post[] = [];
  othersList: Post[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadItems();
    }, 500);
  }

  loadItems() {
    this.dataService.getItemsByCategory('0').then((electronics) => {
      if (this.isShowAll) {
        this.elcectonicsList = electronics.reverse();
      } else {
        this.elcectonicsList = electronics.reverse().slice(0, 4);
      }
    });

    this.dataService.getItemsByCategory('1').then((vehicles) => {
      if (this.isShowAll) {
        this.vehiclesList = vehicles.reverse();
      } else {
        this.vehiclesList = vehicles.reverse().slice(0, 4);
      }
    });

    this.dataService.getItemsByCategory('2').then((properties) => {
      if (this.isShowAll) {
        this.propertiesList = properties.reverse();
      } else {
        this.propertiesList = properties.reverse().slice(0, 4);
      }
    });

    this.dataService.getItemsByCategory('3').then((pets) => {
      if (this.isShowAll) {
        this.petsList = pets.reverse();
      } else {
        this.petsList = pets.reverse().slice(0, 4);
      }
    });
  }

  open(url: string) {
    this.router.navigateByUrl('category/' + url);
  }
}

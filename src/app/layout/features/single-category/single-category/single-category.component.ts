import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../../model/addPostResponse';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.sass',
})
export class SingleCategoryComponent {
  subCategory: string = '';
  isShowAll = true;
  postData: Post[] = [];

  constructor(
    private dataService: DataService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      if (params && params.get('subcategory')) {
        this.subCategory = params.get('subcategory') || '';
        this.loadItems();
      }
    });

    // setTimeout(() => {
    // }, 500);
  }

  loadItems() {
    if (this.subCategory == 'electronics') {
      this.dataService.getItemsByCategory('0').then((electronics) => {
        this.postData = electronics.reverse();
      });
    }

    if (this.subCategory == 'vehicle') {
      this.dataService.getItemsByCategory('1').then((vehicles) => {
        this.postData = vehicles.reverse();
      });
    }

    if (this.subCategory == 'property') {
      this.dataService.getItemsByCategory('2').then((properties) => {
        this.postData = properties.reverse();
      });
    }

    if (this.subCategory == 'pets') {
      this.dataService.getItemsByCategory('3').then((pets) => {
        this.postData = pets.reverse();
      });
    }
  }

  searchProduct(product: string) {
    let searchList = this.postData;

    searchList.filter((x) => {
      return x.itemName.includes(product);
    });
  }
}

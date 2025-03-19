import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.sass',
})
export class SingleCategoryComponent {
  subCategory: string = '';
  isShowAll = true;

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      if (params && params.get('subcategory')) {
        this.subCategory = params.get('subcategory') || '';
      }
    });
  }
}

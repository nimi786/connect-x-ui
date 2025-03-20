import { Component, Input } from '@angular/core';
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
  @Input() postData: Post[] = [];
  skeletonList: any[] = [1, 2, 3, 4];

  constructor(private router: Router) {}

  open(url: string) {
    this.router.navigateByUrl('category/' + url);
  }
}

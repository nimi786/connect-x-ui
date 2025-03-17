import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewDetailsCardComponent } from '../view-details-card/view-details-card.component';
import { Post } from '../../../model/addPostResponse';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.sass',
})
export class ItemCardComponent {
  @Input() itemList!: Post;

  constructor(private router: Router, private modalService: NzModalService) {}
  ngOnInit(): void {
    console.log('yyyyyyyyyyyyyyyy', this.itemList);
  }

  showMoreDetails(receiveData: Post, viewType: string) {
    const modalRef = this.modalService.create({
      nzTitle: 'Show Details',
      nzContent: ViewDetailsCardComponent,
      nzFooter: null,
      nzKeyboard: false,
      nzMaskClosable: false,
      nzCentered: true,
      nzClassName: 'view-card-modal',
    });

    modalRef.componentInstance!.openType = viewType;
    modalRef.componentInstance!.singleItemData = receiveData;
    modalRef.afterClose.subscribe((res) => {});
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewDetailsCardComponent } from '../view-details-card/view-details-card.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.sass',
})
export class ItemCardComponent {
  constructor(private router: Router, private modalService: NzModalService) {}
  ngOnInit(): void {}

  gotoProperty() {
    this.router.navigate(['property/2424242']);
  }

  showMoreDetails() {
    const modalRef = this.modalService.create({
      nzTitle: 'Show Details',
      nzContent: ViewDetailsCardComponent,
      nzFooter: null,
      nzKeyboard: false,
      nzMaskClosable: false,
      nzCentered: true,
      nzClassName: 'view-card-modal',
    });

    modalRef.afterClose.subscribe((res) => {});
  }
}

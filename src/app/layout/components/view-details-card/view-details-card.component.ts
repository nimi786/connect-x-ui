import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../_validators/custom-validator';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-view-details-card',
  templateUrl: './view-details-card.component.html',
  styleUrl: './view-details-card.component.sass',
})
export class ViewDetailsCardComponent {
  viewDetailsForm!: FormGroup;
  isHideContact = false;
  constructor(private modal: NzModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.viewDetailsForm = this.fb.group({
      mainCategory: [null, [MyValidators.customRequired('Main Category')]],
      subCategory: [null, [MyValidators.customRequired('Sub Category')]],
      condition: [null, [MyValidators.customRequired('Condition')]],
      itemName: [null, [MyValidators.customRequired('Item Name')]],
      price: [null, [MyValidators.customRequired('Price')]],
      itemDescription: [
        null,
        [MyValidators.customRequired('Item Description')],
      ],
      contactName: [null, [MyValidators.customRequired('Contact Name')]],
      mobileNo: [null, [MyValidators.customRequired('Mobile Number')]],
      city: [null, [MyValidators.customRequired('City')]],
      email: [null, [MyValidators.customRequired('Email')]],
    });
  }

  postAd() {}
}

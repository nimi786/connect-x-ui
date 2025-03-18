import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../_validators/custom-validator';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Post } from '../../../model/addPostResponse';
import { DatePipe } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { DataService } from '../../../services/data.service';
import { mainCategory } from '../../../model/categoryTypes';

@Component({
  selector: 'app-view-details-card',
  templateUrl: './view-details-card.component.html',
  styleUrl: './view-details-card.component.sass',
})
export class ViewDetailsCardComponent {
  viewDetailsForm!: FormGroup;
  isHideContact = false;
  buttonLoading = false;

  categoryList: mainCategory[] = [];

  @Input() singleItemData!: Post;
  @Input() openType!: string;

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private dataService: DataService,
    private modaRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();

    console.log('WWWWWWWWWWWWWWWWWWWWW', this.singleItemData);
    this.getItemById();
    this.loadCategories();
  }

  async loadCategories() {
    this.dataService.getAllCategories().then((category) => {
      this.categoryList = category;
      console.log('Fetched categories', this.categoryList);
    });
  }

  initForm() {
    this.viewDetailsForm = this.fb.group({
      categoryType: [null, [MyValidators.customRequired('Category Type')]],
      dateTime: [new Date()],
      itemName: [null, [MyValidators.customRequired('Item Name')]],
      condition: [null, [MyValidators.customRequired('Condition')]],
      price: [null, [MyValidators.customRequired('Price')]],
      itemDescription: [
        null,
        [MyValidators.customRequired('Item Description')],
      ],
      imageList: [null],
      contactName: [null, [MyValidators.customRequired('Contact Name')]],
      mobileNo: [null, [MyValidators.customRequired('Mobile Number')]],
      city: [null, [MyValidators.customRequired('City')]],
      email: [null, [MyValidators.customRequired('Email')]],
      userId: [null],
      id: [null],
    });
  }

  getItemById() {
    this.viewDetailsForm.patchValue({
      condition: this.singleItemData.condition,
      itemName: this.singleItemData.itemName,
      price: this.singleItemData.price,
      itemDescription: this.singleItemData.itemDescription,
      contactName: this.singleItemData.contactName,
      mobileNo: this.singleItemData.mobileNo,
      city: this.singleItemData.city,
      email: this.singleItemData.email,
      dateTime: this.singleItemData.dateTime,
      imageList: this.singleItemData.imageList,
      userId: this.singleItemData.userId,
      categoryType: this.singleItemData.categoryType,
      id: this.singleItemData.id,
    });
  }

  updateAd() {
    if (!this.viewDetailsForm.valid) {
      this.validateForm();
    } else {
      this.updateItemById();
    }
  }

  async updateItemById() {
    this.buttonLoading = true;
    // const currentDateAndTime = this.datePipe.transform(
    //   new Date(),
    //   'yyyy-MM-dd HH:mm:ss'
    // );

    const currentUserId = this.authService.userData.uid;

    const formData: any = {
      id: this.viewDetailsForm.get('id')?.value || '',
      categoryType: this.viewDetailsForm.get('categoryType')?.value || '',
      condition: this.viewDetailsForm.get('condition')?.value || '',
      itemName: this.viewDetailsForm.get('itemName')?.value || '',
      price: this.viewDetailsForm.get('price')?.value || '',
      itemDescription: this.viewDetailsForm.get('itemDescription')?.value || '',
      contactName: this.viewDetailsForm.get('contactName')?.value || '',
      mobileNo: this.viewDetailsForm.get('mobileNo')?.value || '',
      city: this.viewDetailsForm.get('city')?.value || '',
      email: this.viewDetailsForm.get('email')?.value || '',
      dateTime: this.viewDetailsForm.get('dateTime')?.value || '',
      imageList: this.viewDetailsForm.get('imageList')?.value || [],
      userId: currentUserId,
    };

    console.log('Post Data Before Upload:', formData);

    this.dataService
      .updatePost(formData)
      .then(() => {
        console.log('Post update successfully!');
        alert('Post update successfully!');
        this.buttonLoading = false;
        this.modaRef.close('update-item');
      })
      .catch((error) => {
        console.error('Failed to update post:', error);
        alert('Failed to update post. Please try again.');
        this.buttonLoading = false;
      });
  }

  validateForm() {
    Object.values(this.viewDetailsForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}

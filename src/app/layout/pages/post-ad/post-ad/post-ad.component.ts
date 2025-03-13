import { Component } from '@angular/core';
import { ImageUploadComponent } from '../../../features/home/image-upload/image-upload.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../../_validators/custom-validator';
interface MainCategory {
  id: string;
  categoryName: string;
}
@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrl: './post-ad.component.sass',
})
export class PostAdComponent {
  addNewIncomeTransactionForm!: FormGroup;

  radioValue = 'A';
  isHideContact = false;
  isVisibleContact = false;
  isHidePrimary = false;
  isVisiblePrimary = false;
  isHideBank = false;
  isVisibleBank = false;
  modalTitle!: string;
  formLabel!: string;
  isVisible = false;
  showMainCatDropDown = true;

  categoryTypes: MainCategory[] = [
    {
      id: '1',
      categoryName: 'Electronics',
    },
    {
      id: '2',
      categoryName: 'Vehicle',
    },
    {
      id: '3',
      categoryName: 'Property',
    },
    {
      id: '4',
      categoryName: 'Pets',
    },
    {
      id: '5',
      categoryName: 'Toys',
    },
    {
      id: '6',
      categoryName: 'Other',
    },
  ];

  constructor(private modal: NzModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  // get mainCategory() {
  //   return this.addNewIncomeTransactionForm.get('mainCategory');
  // }

  async uploadImage(type: string, openType: string) {
    const modal = this.modal.create({
      nzTitle: 'Upload Images',
      nzContent: ImageUploadComponent,
      nzFooter: null,
      nzKeyboard: false,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: 810,
      nzClassName: 'supporting-img-model',
    });

    modal.componentInstance!.uploadType = type;
    modal.componentInstance!.addType = openType;

    const loadedImages = await this.loadImages();
    if (loadedImages) {
      modal.componentInstance!.list = loadedImages;
    }

    modal.afterClose.subscribe(
      (
        res: { url: string; name: string; file: any; type: string }[] | null
      ) => {
        console.log('res', res);
        if (res && res.length > 0) {
          const imagelist = res.map((x) => x.file);
          this.addNewIncomeTransactionForm
            .get('uploadInvoice')
            ?.setValue(imagelist);
          this.addNewIncomeTransactionForm
            .get('uploadInvoiceName')
            ?.setValue('Image Uploaded');
        }
        console.log(
          'sgs',
          this.addNewIncomeTransactionForm.get('uploadInvoice')?.value
        );
      }
    );
    // modal.componentInstance.
    // modal.afterClose.subscribe((res) => {
    //   if (res?.imageList) {
    //     this.addNewIncomeTransactionForm
    //       .get('uploadInvoice')
    //       ?.setValue(res.imageList);
    //   }
    // });
  }

  loadCaegoryType() {}

  private getBase64URL(img: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(img);
    });
  }
  async loadImages() {
    const files = this.addNewIncomeTransactionForm.get('uploadInvoice')?.value;

    if (!files) return null;

    const imagelist: { url: string; name: string; file: any; type: string }[] =
      await Promise.all(
        files.map(async (x: File) => {
          const base64 = await this.getBase64URL(x);
          return {
            url: base64,
            name: x.name,
            file: x,
          };
        })
      );

    return imagelist;
  }

  postAd() {
    if (!this.addNewIncomeTransactionForm.valid) {
      this.validateForm();
    } else {
      this.SaveAddnewTransaction();
    }
  }

  SaveAddnewTransaction() {
    // let formData = new FormData();

    const formData = {
      categoryType: this.addNewIncomeTransactionForm.get('categoryType')?.value,
      condition: this.addNewIncomeTransactionForm.get('condition')?.value,
      itemName: this.addNewIncomeTransactionForm.get('itemName')?.value,
      price: this.addNewIncomeTransactionForm.get('price')?.value,
      itemDescription:
        this.addNewIncomeTransactionForm.get('itemDescription')?.value,
      contactName: this.addNewIncomeTransactionForm.get('contactName')?.value,
      mobileNo: this.addNewIncomeTransactionForm.get('mobileNo')?.value,
      city: this.addNewIncomeTransactionForm.get('city')?.value,
      email: this.addNewIncomeTransactionForm.get('email')?.value,
    };

    console.log('formCheck', formData);

    // this.income.saveTransaction(formData).subscribe({
    //   next: (res) => {
    //     this.notificationService.create('success', 'Success', res.message);

    //     this.clear();
    //     this.isLoading = false;
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //   },
    // });
  }

  initForm() {
    this.addNewIncomeTransactionForm = this.fb.group({
      categoryType: [null, [MyValidators.customRequired('Category Type')]],
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

  validateForm() {
    Object.values(this.addNewIncomeTransactionForm.controls).forEach(
      (control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
    );
  }
}

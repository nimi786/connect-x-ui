import { Component } from '@angular/core';
import { ImageUploadComponent } from '../../../features/home/image-upload/image-upload.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../../_validators/custom-validator';
import { DataService } from '../../../../services/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { format } from 'date-fns';
import { DatePipe, formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { FirebasePostResponse, Post } from '../../../../model/addPostResponse';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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
  postForm!: FormGroup;

  posts: Post[] = [];

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

  constructor(
    private modal: NzModalService,
    private fb: FormBuilder,
    private dataService: DataService,
    private notificationService: NzNotificationService,
    private datePipe: DatePipe,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadItems();
  }

  initForm() {
    this.postForm = this.fb.group({
      categoryType: [null, [MyValidators.customRequired('Category Type')]],
      condition: [null, [MyValidators.customRequired('Condition')]],
      itemName: [null, [MyValidators.customRequired('Item Name')]],
      uploadImageName: [null],
      imageList: [null],
      dateTime: [new Date()],
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

  async uploadImage(openType: string) {
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

    modal.componentInstance!.addType = openType;

    // Load previously uploaded images
    const loadedImages = this.postForm.get('imageList')?.value || [];

    if (loadedImages.length > 0) {
      modal.componentInstance!.list = loadedImages; // Ensure images are set in the modal
    }

    modal.afterClose.subscribe(
      (
        res: { url: string; name: string; file: any; type: string }[] | null
      ) => {
        console.log('res', res);
        if (res && res.length > 0) {
          const existingImages = this.postForm.get('imageList')?.value || [];
          const updatedImages = [...existingImages, ...res.map((x) => x.file)];

          this.postForm.get('imageList')?.setValue(updatedImages);
          this.postForm.get('uploadImageName')?.setValue('Image Uploaded');
        }
        console.log(
          'Updated Image List:',
          this.postForm.get('imageList')?.value
        );
      }
    );
  }

  private async uploadImagesToFirebase(files: any[]): Promise<string[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        // ✅ Ignore URLs (only upload real File objects)
        if (!(file instanceof File)) {
          console.warn('Skipping non-file object:', file);
          resolve(file); // Just return the URL without uploading again
          return;
        }

        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `uploads/${fileName}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file, {
          contentType: file.type, // Ensure correct MIME type
        });

        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(
                (url) => {
                  console.log('Uploaded file URL:', url);
                  resolve(url); // Return the correct download URL
                },
                (error) => {
                  console.error('Error getting download URL:', error);
                  reject(error);
                }
              );
            })
          )
          .subscribe();
      });
    });

    return Promise.all(uploadPromises);
  }

  async loadImages() {
    const files = this.postForm.get('imageList')?.value;

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

  private getBase64URL(img: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(img);
    });
  }

  postAd() {
    if (!this.postForm.valid) {
      this.validateForm();
    } else {
      this.addPost();
    }
  }

  cancel() {
    this.postForm.reset();
  }

  async addPost() {
    const currentDateAndTime = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    );

    const formData: any = {
      categoryType: this.postForm.get('categoryType')?.value || '',
      condition: this.postForm.get('condition')?.value || '',
      itemName: this.postForm.get('itemName')?.value || '',
      price: this.postForm.get('price')?.value || '',
      itemDescription: this.postForm.get('itemDescription')?.value || '',
      contactName: this.postForm.get('contactName')?.value || '',
      mobileNo: this.postForm.get('mobileNo')?.value || '',
      city: this.postForm.get('city')?.value || '',
      email: this.postForm.get('email')?.value || '',
      dateTime: currentDateAndTime || '',
      imageList: [],
    };

    console.log('Post Data Before Upload:', formData);

    const files = this.postForm.get('imageList')?.value;

    if (files && files.length > 0) {
      try {
        const imageUrls = await this.uploadImagesToFirebase(files); // ✅ Upload new images, keep URLs
        formData.imageList = imageUrls.map((url) => ({ url })); // ✅ Save only URLs to DB

        console.log('Post Data After Appending Images:', formData);

        this.dataService
          .savePost(formData)
          .then(() => {
            console.log('Post saved successfully!');
            alert('Post saved successfully!');
            this.postForm.reset();
          })
          .catch((error) => {
            console.error('Failed to save post:', error);
            alert('Failed to save post. Please try again.');
          });
      } catch (error) {
        console.error('Image Upload Failed:', error);
      }
    } else {
      console.warn('No images found for upload.');
    }
  }

  loadItems() {
    this.dataService.getItemsByCategory('1').then((posts) => {
      this.posts = posts; // Assuming each post has an `imageUrl`
      console.log('+++++++++', this.posts);
    });
  }

  validateForm() {
    Object.values(this.postForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}

import { Component, EventEmitter, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import {
  BehaviorSubject,
  Observable,
  Observer,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { EventTriggerService } from '../../../services/event-trigger.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.sass',
})
export class ImageUploadComponent {
  list: { url: string; name: string; file: any; downloadPath?: string }[] = [];
  allChecked = false;
  savedList: any[] = [];
  @Input() img_url!: string;
  @Input() uploadType!: string;
  @Input() addType!: string;
  @Input() data: any;

  imageFile$ = new BehaviorSubject<any>([]);
  UploadedFileList!: any[];
  constructor(
    private msg: NzMessageService,
    private eventTrigger: EventTriggerService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.UploadedFileList = this.data;
      console.log(this.data);
    }
  }
  showWebcam = false;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId!: string;
  url!: string;
  capturedImagePreview!: string;

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        (file.type === 'image/jpeg' && !file.name.endsWith('.jfif')) ||
        file.type === 'image/png';

      if (file.type === 'image/jpeg' && file.name.endsWith('.jfif')) {
        this.msg.error('You can only upload JPG/PNG files!');
        observer.complete();
        return;
      }

      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG/PNG files!');
        observer.complete();
        return;
      }

      observer.next(isJpgOrPng);
      observer.complete();
    });
  private getBase64(file: any, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(file);
  }
  dragUpload(info: { file: NzUploadFile }): void {
    this.getBase64(info.file!.originFileObj!, (img: string) => {});
  }

  fileList: NzUploadFile[] = [];
  progress = 0;
  isChecked = false;

  customUpload = (item: NzUploadXHRArgs): Subscription => {
    return this.imageFile$.subscribe({
      next: (res) => {
        if (item.file) {
          this.getBase64(item.file, (img: string) => {
            this.list.push({ url: img, name: item.file.name, file: item.file });
            if (this.allChecked) {
              this.savedList.push({
                url: img,
                name: item.file.name,
                file: item.file,
              });
            }
            // this.blobFileList.push(item.file); // Add to blobFileList here
          });
          console.log('this.list', this.list);
        } else {
          console.error('Origin file object is not available.');
        }
      },
    });
  };
  removeImage(i: number) {
    if (i > -1) {
      this.list.splice(i, 1);
      this.progress = 100;
    }
  }

  log(event: any) {
    if (event) {
      this.allChecked = true;
      this.isChecked = true;
      this.savedList = [...this.list, ...this.fileList]; // Select all files
      console.log('rrgrhrhr', this.savedList);
    } else {
      this.savedList = []; // Clear selection]
      this.allChecked = false;
      this.isChecked = false;
    }
  }

  pushtoList(li: { url: string; name: string; file: any }) {
    const index = this.savedList.findIndex((item) => item === li);
    if (index === -1) {
      this.savedList.push(li);
    } else {
      // If unchecked, remove from list
      this.savedList.splice(index, 1);
    }
    if (this.savedList.length === this.list.length) {
      this.allChecked = true;
    } else {
      this.allChecked = false;
    }
  }

  async downloadAll() {
    const list = await this.savedList.map((x) => {
      if (x.file instanceof File) {
        this.downloadFile(x);
      } else {
        return x.downloadPath;
      }
    });
    if (list.length == 0) {
      this.notification.error('', 'Please select atleast one document');
      return;
    } else {
      const newList = list
        .toString()
        ?.split(',')
        ?.filter((x) => x.length > 0);
      console.log('new list ', newList);

      // const data: employeeDownloadDocumentRequest = {
      //   documentUrl: newList,
      // // };
      // data.documentUrl?.length > 0 &&
      //   this.EmployeeService.downloadDocument(data).subscribe((res) => {
      //     if (res) {
      //       this.downloadImageFile(res, 'application/zip', 'document.zip');
      //     }
      //   });
    }
  }
  downloadFile(file: any): void {
    if (file.file instanceof File) {
      const url = window.URL.createObjectURL(file.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name || 'audio-file.mp3'; // Default to 'audio-file.mp3' if no name is provided
      link.click();

      // Clean up the URL after the download to avoid memory leaks
      window.URL.revokeObjectURL(url);
    } else {
      this.downloadSingleDocument(file);
    }
  }

  downloadImageFile(data: Blob, fileType: string, fileName: string) {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  downloadSingleDocument(url: any) {
    // const data: employeeDownloadDocumentRequest = {
    //   documentUrl: url.downloadPath,
    // };
    // this.EmployeeService.downloadSingleDocument(data).subscribe((res) => {
    //   if (res) {
    //     this.downloadImageFile(res, 'image/jpeg', url?.name!);
    //   }
    // });
  }

  clearList() {
    if (this.savedList.length === 0) {
      this.notification.error('', 'Please select at least one document');
      return;
    } else {
      // Remove only the selected files from the main list
      this.savedList.forEach((selectedFile) => {
        const index = this.list.findIndex((x) => x == selectedFile);
        if (index > -1) {
          this.list.splice(index, 1); // Remove from main list
        }
      });

      // Clear the saved list
      this.savedList = [];
      this.isChecked = false;
      this.allChecked = false;
    }
  }

  close() {
    this.modalRef.close(this.list);
  }
}

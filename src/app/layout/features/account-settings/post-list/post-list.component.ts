import { Component, Input } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FirebasePostResponse, Post } from '../../../../model/addPostResponse';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewDetailsCardComponent } from '../../../components/view-details-card/view-details-card.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass',
})
export class PostListComponent {
  isTableLoading = true;
  @Input() itemList!: Post;
  userPosts: Post[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.itemList;
      this.loadAllItemsByUserId();
    }, 1000);
  }

  updatePost(receiveData: Post, viewType: string) {
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

  deleteItem(itemId: Post) {
    this.dataService.deletePostById(itemId).then(() => {
      console.log(
        'Item deleted successfullyiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
      );
      alert('Item deleted successfully!');
      window.location.reload();
    });
  }

  async loadAllItemsByUserId() {
    const userId = this.authService.userData.uid;
    this.userPosts = await this.dataService.getPostsByUserId(userId);
    if (this.userPosts.length > 0) {
      this.isTableLoading = false;
    }
    console.log(
      'User Posts+++++++++++++++++++++++++++++++++++++++++++++++++++++++=:',
      this.userPosts
    );
  }
}

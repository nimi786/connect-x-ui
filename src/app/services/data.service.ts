import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  set,
  get,
  update,
  remove,
  child,
  push,
  getDatabase,
} from '@angular/fire/database';

import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable } from 'rxjs';
import { CommonService } from './common/common.service';
import { Post } from '../model/addPostResponse';
import { mainCategory } from '../model/categoryTypes';
import { DatabaseReference } from '@angular/fire/compat/database/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: any;
  loggedInPassword: any;
  private postPath = '/posts';
  private categoryPath = '/categoryList';

  constructor(
    private db: Database,
    private commonService: CommonService,
    private http: HttpClient
  ) {}

  savePost(formData: any): Promise<any> {
    console.log('Received FormData in Service:', formData);

    const categoryType = formData.categoryType;
    console.log('Category Type from formData:', categoryType);

    if (!categoryType) {
      console.error('Category type is missing!');
      return Promise.reject('Category type is missing!');
    }

    const categoryPath = `${this.postPath}/${categoryType}`;
    const newItemRef = push(ref(this.db, categoryPath));
    return set(newItemRef, formData);
  }

  updatePost(formData: any): Promise<any> {
    console.log('Received FormData in Service:', formData);
    console.log('id  from formData:', formData.id);
    console.log('Category Type from formData:', formData.categoryType);

    if (!formData.categoryType || !formData.id) {
      console.error('Category type or ID is missing!');
      return Promise.reject('Category type or ID is missing!');
    }

    const itemPath = `${this.postPath}/${formData.categoryType}/${formData.id}`;

    return update(ref(this.db, itemPath), formData)
      .then(() => {
        console.log('Post updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating post:', error);
        throw error;
      });
  }

  deletePostById(itemId: Post): Promise<any> {
    console.log('iiiiiiiiiiiiiiiiiiiiii', itemId);

    const itemRef = ref(
      this.db,
      `${this.postPath}/${itemId.categoryType}/${itemId.id}`
    );
    return remove(itemRef);
  }

  async getAllCategories(): Promise<mainCategory[]> {
    const categoryPath = `${this.categoryPath}`;
    const dbRef = ref(this.db);
    const snapshot = await get(child(dbRef, categoryPath));

    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  }

  async getPostsByUserId(userId: string): Promise<Post[]> {
    const postsRef = ref(this.db, this.postPath);
    const snapshot = await get(postsRef);

    if (snapshot.exists()) {
      const postsData = snapshot.val();
      const filteredPosts = [];

      for (const categoryKey in postsData) {
        for (const postId in postsData[categoryKey]) {
          if (postsData[categoryKey][postId].userId === userId) {
            filteredPosts.push({
              id: postId,
              ...postsData[categoryKey][postId],
            });
          }
        }
      }

      return filteredPosts;
    } else {
      return [];
    }
  }

  async getItemsByCategory(categoryType: string): Promise<Post[]> {
    const categoryPath = `${this.postPath}/${categoryType}`;
    const dbRef = ref(this.db);
    const snapshot = await get(child(dbRef, categoryPath));

    if (snapshot.exists()) {
      const data = snapshot.val();

      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })) as Post[];
    } else {
      return [];
    }
  }
}

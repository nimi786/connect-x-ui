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
} from '@angular/fire/database';

import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable } from 'rxjs';
import { CommonService } from './common/common.service';
import { Post } from '../model/addPostResponse';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: any;
  loggedInPassword: any;
  private dbPath = '/posts';

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

    const categoryPath = `${this.dbPath}/${categoryType}`;
    const newItemRef = push(ref(this.db, categoryPath));
    return set(newItemRef, formData);
  }

  async getItemsByCategory(categoryType: string): Promise<Post[]> {
    const categoryPath = `${this.dbPath}/${categoryType}`;
    const dbRef = ref(this.db);
    const snapshot = await get(child(dbRef, categoryPath));

    if (snapshot.exists()) {
      const data = snapshot.val(); // Firebase response is an object
      // Convert object to array
      return Object.keys(data).map((key) => ({
        id: key, // Add Firebase key as 'id'
        ...data[key], // Spread the rest of the post data
      })) as Post[];
    } else {
      return [];
    }
  }
}

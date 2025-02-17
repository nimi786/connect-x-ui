import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: any;
  loggedInPassword: any;
  constructor() {}
}

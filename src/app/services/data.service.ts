import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { catchError, map, Observable } from 'rxjs';
import { CommonService } from './common/common.service';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: any;
  loggedInPassword: any;

  constructor(private db: Firestore, private commonService: CommonService) {}

  //   addNewUser(_newId:any, _fName:string, _lName:string, _vip:boolean) {
  //     this.db.collection("User").doc(_newId).set({firstName:_fName,lastName:_lName,vipMember:_vip});
  //  }

  // saveSecondaryIdentity(formData: any, data: any) {
  //   const url = environment.saveSecondaryId + data.customerDetailsId;
  //   let urlParams = new HttpParams();
  //   data.secondaryIdType
  //     ? (urlParams = urlParams.append('secondaryIdType', data.secondaryIdType))
  //     : null;
  //   return this.http.post(url, formData, { params: urlParams }).pipe(
  //     catchError((err) => {
  //       return this.commonService.catchError(err);
  //     }),
  //     map((response: any) => {
  //       // this.responseHandler();
  //       return response;
  //     })
  //   );
  // }
}

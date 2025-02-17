import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: Observable<firebase.User> | undefined;
  constructor(private afs: AngularFireAuth) {
    // this.user = afs.authState;
  }

  // signInWithGoogle() {
  //   return this.afs.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }

  // registerWithEmailAndPassword(user: { email: string; password: string }) {
  //   return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  // }

  login(email: string, password: string) {
    this.afs
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Nice, it worked!', value);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  signup(email: string, password: string) {
    this.afs
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success!', value);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.afs.signOut();
  }
}

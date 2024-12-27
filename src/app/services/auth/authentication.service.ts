import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afs: AngularFireAuth) {}

  signInWithGoogle() {
    return this.afs.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  registerWithEmailAndPassword(user: { email: string; password: string }) {
    return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  }

  signInWithEmailAndPassword(user: { email: string; password: string }) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password);
  }
}

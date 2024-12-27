import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../../../../_validators/custom-validator';
import { AuthenticationService } from '../../../../services/auth/authentication.service';

import { AngularFireAuth } from '@angular/fire/compat/auth'; // Use AngularFireAuth from compat module
import firebase from 'firebase/compat/app'; // Import Firebase app for compatibility
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public auth: AngularFireAuth,
    private authService: AuthenticationService
  ) {}
  loginForm!: FormGroup;

  autoTips: Record<string, Record<string, string>> = {
    en: {},
    default: {},
  };

  ngOnInit() {
    this.inInItForm();
  }

  inInItForm() {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          MyValidators.pattern(''),
          MyValidators.customRequired('Email'),
          MyValidators.email(
            '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
          ),
        ],
      ],
      password: [
        '',
        [
          MyValidators.customRequired('Password'),
          MyValidators.pattern(
            '^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'
          ),
          MyValidators.minLength(4),
          MyValidators.maxLength(12),
        ],
      ],
    });
    // this.store.select(selectLoginLoadingStatus).subscribe((data) => {
    //   this.isLoading = data;
    // });
  }

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }

  validateForm() {
    Object.values(this.loginForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      this.validateForm();
      return;
    } else {
      // const data: loginRequest = {
      //   username: this.loginForm.get('userName')?.value,
      //   password: this.loginForm.get('password')?.value,
      // };
      // this.store.dispatch(login({ payload: data }));
    }
  }

  // async loginWithGoogle() {
  //   // this.authService
  //   //   .signInWithGoogle()
  //   //   .then((res: any) => {
  //   //     this.router.navigateByUrl('/');
  //   //   })
  //   //   .catch((error: any) => {
  //   //     console.log(error);
  //   //   });

  //   this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  // }

  async loginWithGoogle() {
    const authInstance = getAuth(); // Get the Auth instance
    const provider = new GoogleAuthProvider(); // Create the provider instance
    try {
      const result = await signInWithPopup(authInstance, provider); // Use modular SDK
      console.log('Login successful:', result.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  }
}

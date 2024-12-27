import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../../../../_validators/custom-validator';

import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  authState,
  UserCredential,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  user$!: Observable<any | null>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: Auth
  ) {
    this.user$ = authState(this.auth);
  }
  loginForm!: FormGroup;

  autoTips: Record<string, Record<string, string>> = {
    en: {},
    default: {},
  };

  ngOnInit() {
    this.inInItForm();
    this.user$.subscribe((res) => {
      console.log('res', res);
    });
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

  loginWithGoogle() {
    // this.authService
    //   .signInWithGoogle()
    //   .then((res: any) => {
    //     this.router.navigateByUrl('/');
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });

    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((res: UserCredential) => {
        this.router.navigateByUrl('/');
      })
      .catch((error) => console.error('Sign-in error:', error));
  }
}

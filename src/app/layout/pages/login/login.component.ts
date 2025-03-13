import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../../../_validators/custom-validator';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  authState,
  UserCredential,
} from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  isButtonLoading = false;

  autoTips: Record<string, Record<string, string>> = {
    en: {},
    default: {},
  };
  subscription!: Subscription;

  user$!: Observable<any | null>;
  passwordVisible = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: Auth,
    public dataService: DataService,
    private afAuth: AngularFireAuth,
    private notificationService: NzNotificationService
  ) {
    this.user$ = authState(this.auth);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.initForm();
    this.user$.subscribe((res) => {
      console.log('res', res);
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          // MyValidators.pattern(''),
          MyValidators.customRequired('Email'),
          // MyValidators.email(
          //   '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
          // ),
        ],
      ],
      password: [
        '',
        [
          MyValidators.customRequired('Password'),
          // MyValidators.pattern(
          //   '^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'
          // ),
          // MyValidators.minLength(4),
          // MyValidators.maxLength(12),
        ],
      ],
      grantType: 'customer',
    });
  }

  navigateToSignUp() {
    this.router.navigateByUrl('/signup');
  }

  validateForm() {
    Object.values(this.loginForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submitForm() {
    if (!this.loginForm.valid) {
      this.validateForm();
      return;
    } else {
      this.dataService.loggedInUser = this.userName?.value;
      this.dataService.loggedInPassword = this.password?.value;

      const formData = {
        username: this.userName?.value,
        password: this.password?.value,
        grantType: 'customer',
      };

      this.afAuth
        .signInWithEmailAndPassword(formData.username, formData.password)
        .then((userCredential) => {
          // Handle successful sign in
          // this.notificationService.create('success', 'Success', userCredential);
        })
        .catch((error) => {
          this.notificationService.create('error', 'Error', error);
        });
    }
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((res: UserCredential) => {
        // this.notificationService.create('success', 'Success', error);

        if (res.user.refreshToken) {
          this.router.navigateByUrl('/');
        }
        // this.router.navigate(['/']);
        console.log('hello');
      })
      .catch((error) =>
        this.notificationService.create('error', 'Error', error)
      );
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../../../_validators/custom-validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  autoTips: Record<string, Record<string, string>> = {
    en: {},
    default: {
      email: 'The input is not valid email',
      confirmPassword: 'Password not match',
    },
  };

  passwordVisible = false;
  confirmPasswordVisible = false;
  isButtonLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.inInItForm();
  }

  inInItForm() {
    const {
      maxLength,
      minLength,
      email,
      pattern,
      customRequired,
      required,
      customConfirmPasswordRequired,
    } = MyValidators;

    this.signUpForm = this.fb.group(
      {
        name: ['', [customRequired('Your Name')]],
        email: ['', [customRequired('Email Address')]],
        password: [
          null,
          [
            customRequired('Password'),
            pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
            minLength(8),
          ],
        ],
        confirmPassword: [
          null,
          [
            customConfirmPasswordRequired('Password'),
            pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
            minLength(8),
          ],
        ],
        terms: [false, Validators.requiredTrue],
      },

      { validator: this.checkPasswords }
    );
    // this.store.select(selectLoginLoadingStatus).subscribe((data) => {
    //   this.isLoading = data;
    // });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls['password']?.value;
    const confirmPass = group.controls['confirmPassword']?.value;

    return pass === confirmPass
      ? null
      : group.controls['confirmPassword'].setErrors({
          confirmPassword: true,
        });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control!.value && control!.errors) {
          control!.markAsDirty();
          control!.updateValueAndValidity();
        } else {
          // this.isFieldValid(field);
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  submitForm() {
    console.log('this.signUpForm', this.signUpForm);

    if (!this.signUpForm.valid) {
      this.validateAllFormFields(this.signUpForm);
      this.checkPasswords(this.signUpForm);
      return;
    } else {
      this.isButtonLoading = true;
      const formData = {
        password: this.signUpForm.get('password')?.value,
        userDto: {
          customerName: this.signUpForm.get('name')?.value,
          email: this.signUpForm.get('email')?.value,
          userType: 'customer',
        },
      };
      // this.authenticationService.signUp(formData).subscribe({
      //   next: (res:any) => {
      //     this.isButtonLoading = false;
      //     this.notificationService.create('success', 'Success', res.message);
      //     this.cancel();
      //   },
      //   error: () => {
      //     this.isButtonLoading = false;
      //   },
      // });
    }
  }

  cancel() {
    this.signUpForm.reset();
    this.router.navigateByUrl('/login');
  }
}

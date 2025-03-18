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
    this.initForm();
  }

  initForm() {
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
        name: [null, [MyValidators.customRequired('Your Name')]],
        email: [null, [MyValidators.customRequired('Email Address')]],
        password: [
          null,
          [
            MyValidators.customRequired('Password'),
            pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
            minLength(8),
          ],
        ],
        confirmPassword: [
          null,
          [
            MyValidators.customConfirmPasswordRequired('Password'),
            pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$'),
            minLength(8),
          ],
        ],
      },

      { validator: this.checkPasswords }
    );
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

  validateForm() {
    Object.values(this.signUpForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  submitForm() {
    console.log('this.signUpForm', this.signUpForm);

    if (!this.signUpForm.valid) {
      this.validateForm();
      return;
      this.checkPasswords(this.signUpForm);
      return;
    } else {
      this.isButtonLoading = true;
      // const formData = {
      //   password: this.signUpForm.get('password')?.value,
      //   userDto: {
      //     customerName: this.signUpForm.get('name')?.value,
      //     email: this.signUpForm.get('email')?.value,
      //     userType: 'customer',
      //   },
      // };
    }
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}

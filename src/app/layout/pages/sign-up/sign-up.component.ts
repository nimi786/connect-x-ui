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
import { DataService } from '../../../services/data.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';

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
    private notificationService: NzNotificationService,
    public authService: AuthenticationService
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
    const password = group.controls['password']?.value;
    const confirmPass = group.controls['confirmPassword']?.value;

    return password === confirmPass
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

  saveUser() {
    console.log('this.signUpForm', this.signUpForm);
    if (!this.signUpForm.valid) {
      this.validateForm();
      return;
    } else {
      this.isButtonLoading = true;
      const formData = {
        name: this.signUpForm.get('name')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
      };

      this.authService
        .signUp(formData.email, formData.password)
        .then((res) => {
          alert('Your account has been created, Now You can login');
          this.signUpForm.reset(); // Reset form after successful registration
          this.isButtonLoading = false;
        })
        .catch((err) => {
          alert('Something went wrong: ' + err.message);
          this.isButtonLoading = false;
        });
    }
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}

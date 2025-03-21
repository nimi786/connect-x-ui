import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyValidators } from '../../../_validators/custom-validator';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.sass',
})
export class ContactUsComponent {
  contactUsForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    const {
      required,
      customRequired,
      customSelectorRequired,
      maxLength,
      minLength,
      customEmail,
      pattern,
    } = MyValidators;

    this.contactUsForm = this.fb.group({
      name: ['', [customRequired(' Name')]],
      email: ['', [customRequired('Email')]],
      phone: ['', [customRequired('Phone')]],
      city: ['', [customRequired('City')]],
      comment: ['', [customRequired('Comment')]],
    });
  }
}

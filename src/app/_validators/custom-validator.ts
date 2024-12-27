import {
  AbstractControl,
  FormArray,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `Minimum Length is ${minLength}`,
        },
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `Maximum Length is ${maxLength}`,
        },
      };
    };
  }

  static override pattern(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Password must contain at least 8 characters with one Uppercase, one simple case, one number and one special character`,
        },
      };
    };
  }

  static customPattern(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Please enter a password that follows the below validations: Minimum 4  to maximum 12 characteristics ,Must be at least 4 digits & Should not contain any spaces and should not be empty`,
        },
      };
    };
  }

  static patternURL(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Enter correct URL`,
        },
      };
    };
  }

  static customEmail(pattern: any, name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `${name} must be valid`,
        },
      };
    };
  }

  static customRequired(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        required: {
          'zh-cn': `最大长度为 `,
          en: `Please Input ${name}`,
        },
      };
    };
  }

  static customRequiredYesOrNo(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        required: {
          'zh-cn': `最大长度为 `,
          en: `Please select ${name}`,
        },
      };
    };
  }

  static customSelected(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        required: {
          'zh-cn': `最大长度为 `,
          en: `${name} Not Selected`,
        },
      };
    };
  }

  static showCustomSelectorMessage(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        required: {
          'zh-cn': `最大长度为 `,
          en: `${name}`,
        },
      };
    };
  }

  static customSelectorRequired(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      } else
        return {
          pattern: {
            'zh-cn': `最大长度为 `,
            en: `Please Select ${name}`,
          },
        };
    };
  }

  static customConfirmPasswordRequired(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Please confirm ${name}`,
        },
      };
    };
  }

  static monthValidator(): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;
      if (value && (isNaN(value) || value < 1 || value > 12)) {
        return {
          pattern: {
            'zh-cn': `最大长度为 `,
            en: `Month should be valid`,
          },
        };
      }
      return null;
    };
  }

  static phonenumValidator(allowPhoneNumber: boolean = false): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;
      if (isNaN(value)) {
        return {
          numValidator: {
            'zh-cn': '请输入有效数字',
            en: 'Please enter a valid number',
          },
        };
      }
      if (allowPhoneNumber && !/^\d{12}$/.test(value)) {
        return {
          numValidator: {
            'zh-cn': '请输入有效电话号码',
            en: 'Please enter a valid phone number',
          },
        };
      }

      return null;
    };
  }

  static numValidator(): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;
      if (isNaN(value)) {
        return {
          numValidator: {
            'zh-cn': '请输入有效数字',
            en: 'Please enter a valid number',
          },
        };
      }
      return null;
    };
  }

  static numValidatorwithd(): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;

      // Remove the "$" sign if it exists
      const numericValue = parseFloat(value.replace('$', ''));

      if (isNaN(numericValue)) {
        return {
          numValidator: {
            'zh-cn': '请输入有效数字',
            en: 'Please enter a valid number',
          },
        };
      }

      return null;
    };
  }

  static customRequiredForUpload(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      } else {
        return {
          upload: {
            'zh-cn': `请上传文件`,
            en: `Please upload ${name}`,
          },
        };
      }
    };
  }

  static customRequiredsalary(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.required(control) === null) {
        return null;
      } else
        return {
          pattern: {
            'zh-cn': `最大长度为 `,
            en: `Please input ${name}`,
          },
        };
    };
  }

  static imageValidator(
    allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'],
    maxSizeInKB: number = 1024
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file: File = control.value;

      if (!file) {
        return null; // No file selected, validation passes.
      }

      // Check file type
      if (allowedTypes && allowedTypes.indexOf(file.type) === -1) {
        return {
          imageValidator: {
            valid: false,
            message: 'Please select a valid image file (JPEG, PNG, GIF).',
          },
        };
      }

      // Check file size
      if (file.size > maxSizeInKB * 1024) {
        return {
          imageValidator: {
            valid: false,
            message: `File size exceeds the maximum limit of ${maxSizeInKB}KB.`,
          },
        };
      }

      return null; // Validation passes.
    };
  }

  static override email(pattern: any): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `Email must be valid`,
        },
      };
    };
  }

  static maxWordCount(maxWords: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (control.value) {
        const words = control.value.trim().split(/\s+/);
        if (words.length <= maxWords) {
          return null;
        }
        return {
          wordcount: {
            'zh-cn': `最大单词数为 ${maxWords}`,
            en: `Maximum word count is ${maxWords}`,
          },
        };
      }
      return null;
    };
  }

  static atLeastOneSelectedValidator(
    min: number = 1,
    name: string
  ): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const formArray = control as FormArray;
      const selectedCount = formArray.controls.filter(
        (ctrl) => ctrl.value.select
      ).length;
      if (selectedCount >= min) {
        return null;
      }

      return {
        required: {
          'zh-cn': `最大长度为 ${min}`,
          en: `Select at least ${min} ${name}`,
        },
      };
    };
  }

  static customUserName(pattern: any, name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.pattern(pattern)(control) === null) {
        return null;
      }
      return {
        pattern: {
          'zh-cn': `最大长度为 `,
          en: `${name} Should not be empty or contain any special characters and numbers`,
        },
      };
    };
  }
  static TextandNovalidation(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;

      // Check if the value is empty
      // if (!value) {
      //   return {
      //     pattern: {
      //       'zh-cn': `字段不能为空。`,
      //       en: `${name} cannot be left empty.`,
      //     },
      //   };
      // }

      // Define a pattern that disallows special characters (letters, numbers, spaces only)
      const noSpecialCharactersPattern = /^[a-zA-Z0-9\s]+$/;

      // Check if the value contains any special characters
      if (!noSpecialCharactersPattern.test(value)) {
        return {
          pattern: {
            'zh-cn': `不允许包含特殊字符。`,
            en: `${name} should not contain any special characters.`,
          },
        };
      }

      // Check if the provided pattern matches (if applicable)
      // if (Validators.pattern(pattern)(control) === null) {
      //   return null; // Valid if it matches the provided pattern
      // }

      return null; // Valid if it passes all checks
    };
  }

  static numericLength(
    minLength: number = 1,
    maxLength: number = 12
  ): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control?.value?.toString();

      if (value && value.length >= minLength && value.length <= maxLength) {
        return null;
      }
      if (value) {
        return {
          alphanumeric: {
            'zh-cn': `请输入5到20个字母和数字的组合`,
            en: `Must be between ${minLength} and ${maxLength} digits`,
          },
        };
      }
      return null;
    };
  }

  static customRequiredTextValidator(name: string): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;
      const textPattern = /^[A-Za-z0-9\s]+$/; // Allows only letters and spaces

      // Check if the field is required and has no value
      if (!value) {
        return {
          required: {
            'zh-cn': `请输入 ${name}`,
            en: `Please input ${name}`,
          },
        };
      }

      // Check if the value contains only letters and spaces
      if (!textPattern.test(value)) {
        return {
          onlyText: {
            'zh-cn': `请输入有效的 ${name} (只允许字母)`,
            en: `Cannot contain any special characters`,
          },
        };
      }

      return null; // No errors if both checks pass
    };
  }
  static nicNumberLength(): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value ? control.value.toString() : '';
      const allowedLengths = [10, 12, 16];

      if (allowedLengths.includes(value.length)) {
        return null;
      }

      return {
        nicNumberLength: {
          'zh-cn': `NIC号码长度必须为10、12或16字符`,
          en: `National ID Number must be 10, 12, or 16 characters long`,
        },
      };
    };
  }
  static customNumberLengthValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value) {
        const length = control.value.toString().length;
        if (length < min || length > max) {
          return {
            nicNumberLength: {
              'zh-cn': `NIC号码长度必须为10、12或16字符`,
              en: `Minimum length Can be ${min} and Maximum length Can be${max}`,
            },
          };
        }
      }
      return null;
    };
  }
  static customTelNumberLenth(min: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value) {
        const length = control.value.toString().length;
        if (length != min) {
          return {
            nicNumberLength: {
              'zh-cn': `NIC号码长度必须为10、12或16字符`,
              en: `Number should be ${min} digit`,
            },
          };
        }
      }
      return null;
    };
  }
  static phoneCodeValidator(): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const value = control.value;

      // Allow empty values
      if (!value) {
        return null;
      }

      // Check if value is a valid number or starts with "+" followed by a number
      const validPattern = /^\+?\d+$/; // Allows an optional "+" at the start followed by digits

      if (!validPattern.test(value)) {
        return {
          numValidator: {
            'zh-cn': '请输入有效数字，可以以+号开头',
            en: 'Please enter a valid number, optionally starting with +',
          },
        };
      }
      return null;
    };
  }
}

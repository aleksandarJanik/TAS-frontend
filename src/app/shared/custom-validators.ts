import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static containsLowercase(): ValidatorFn {
    return (elem: AbstractControl): ValidationErrors | null => {
      let regex = new RegExp(/[a-z]/);
      if (regex.test(elem.value) === true) {
        return null;
      } else {
        return { lowercase: true };
      }
    };
  }

  static containsUpercase(): ValidatorFn {
    return (elem: AbstractControl): ValidationErrors | null => {
      let regex = new RegExp(/[A-Z]/);
      if (regex.test(elem.value.trim())) {
        return null;
      } else {
        return { upercase: true };
      }
    };
  }

  static containsNumber(): ValidatorFn {
    return (elem: AbstractControl): ValidationErrors | null => {
      let regex = new RegExp(/[0-9]/);
      if (regex.test(elem.value)) {
        return null;
      } else {
        return { containsnum: true };
      }
    };
  }

  static containsSpecialCharacters(): ValidatorFn {
    return (elem: AbstractControl): ValidationErrors | null => {
      let regex = new RegExp(/[$@$!%*?&]/);
      if (regex.test(elem.value)) {
        return null;
      } else {
        return { containschar: true };
      }
    };
  }

  static matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}

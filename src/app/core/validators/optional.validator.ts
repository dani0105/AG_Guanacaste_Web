import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function optionalValue(isOptional: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isOptional) {
      return null;
    }

    if (control.value == null || control.value == '' || control.value == 0) {
      return { 'required': true }
    }

    return null;
  };
}
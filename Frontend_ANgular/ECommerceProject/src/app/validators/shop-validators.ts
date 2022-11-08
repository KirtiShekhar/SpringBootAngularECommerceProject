import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {
  // white space validations
  static notOnlyWhiteSpaces(
    validatorFormControl: FormControl
  ): ValidationErrors {
    // check if string only contains whitespace
    if (
      validatorFormControl.value != null &&
      validatorFormControl.value.trim().length === 0
    ) {
      // invalid, return error object
      return { notOnlyWhitespace: true };
    } else {
      // valid, return null
      return null;
    }
  }
}

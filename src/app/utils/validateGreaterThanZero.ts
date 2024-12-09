import { AbstractControl, ValidationErrors } from '@angular/forms';

export function greaterThanZeroValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  return value > 0 ? null : { greaterThanZero: true };
}

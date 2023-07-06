import { AbstractControl } from '@angular/forms';

export function AgeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value) {
    let birthdate = new Date(control.value);
    let timeDiff = Math.abs(Date.now() - birthdate.getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    if (age < 25) {
      return { age: true };
    }
  }

  return null;
}

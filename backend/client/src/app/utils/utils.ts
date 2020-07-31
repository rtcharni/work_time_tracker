import * as moment from 'moment';
import {
  ValidatorFn,
  ValidationErrors,
  FormGroup,
  FormControl,
} from '@angular/forms';

export class Utils {
  static colors: Record<string, string> = {
    white: '#ffffff',
    pink: '#FBEAEB',
    blue: '#2F3C7E',
    black: '#000000',
  };

  static convertDateToHH_MM(date: string): string {
    const timeCombined = `${moment(date).hour()}:${moment(date).minute()}`;
    const splitted = timeCombined.split(':');
    let final =
      splitted[0].length === 1 ? `0${splitted[0]}:` : `${splitted[0]}:`;
    final += splitted[1].length === 1 ? `0${splitted[1]}` : `${splitted[0]}`;
    return final;
  }

  static startAndEndtimeValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const startTime = group.get('startTime').value;
      const endTime = group.get('endTime').value;
      if (startTime && endTime && startTime >= endTime) {
        group.get('startTime').setErrors({ endBeforeStart: true });
        group.get('endTime').setErrors({ endBeforeStart: true });
      } else {
        group.get('startTime').setErrors(null);
        group.get('endTime').setErrors(null);
      }
      return;
    };
  }

  static passwordValidator(
    group: FormGroup,
    iAm: 'group' | 'control'
  ): ValidatorFn {
    return () => {
      const password = group.get('password').value;
      const verifyPassword = group.get('verifyPassword').value;
      if (
        password &&
        verifyPassword &&
        password !== verifyPassword &&
        iAm === 'control'
      ) {
        return { passwordsNotMatching: true };
      }
      return null;
    };
  }
}

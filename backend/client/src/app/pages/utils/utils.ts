import * as moment from 'moment';

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
}

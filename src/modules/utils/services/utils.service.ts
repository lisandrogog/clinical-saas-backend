import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  /**
   * Converts a time string in the format [HH:mm] to the number of minutes since midnight.
   * @param time The time string to convert.
   * @returns The number of minutes since midnight.
   */
  toMinutes(time: string): number {
    if (!this.isValidTime(time)) {
      throw new Error(`Invalid time format: ${time}. Expected [HH:mm]`);
    }

    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  /**
   * Validates a time string in the format [HH:mm].
   * @param time The time string to validate.
   * @returns True if the time string is valid, false otherwise.
   */
  isValidTime(time: string): boolean {
    const regex = /^([01]\d|2[0-3]):[0-5]\d$/;

    return regex.test(time);
  }

  /**
   * Converts a time string in the format [HH:mm] to a Date object.
   * @param time The time string to convert.
   * @returns The Date object.
   */
  formatTimeToPrisma(time: string): Date {
    if (!this.isValidTime(time)) {
      throw new Error(`Invalid time format: ${time}. Expected [HH:mm]`);
    }

    return new Date(`1970-01-01T${time.length === 5 ? time + ':00' : time}Z`);
  }

  /**
   * Converts a string to PascalCase.
   * @param str The string to convert.
   * @param separator The separator to use when splitting the string into words.
   * @returns The string in PascalCase.
   */
  toPascalCase(str: string, separator: string = ' '): string {
    if (str.trim().length < 2) {
      return str.toUpperCase();
    }

    return str
      .toLowerCase()
      .split(separator)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(separator);
  }
}

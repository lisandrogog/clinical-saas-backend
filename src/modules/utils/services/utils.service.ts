import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  toMinutes(time: string): number {
    if (!this.isValidTime(time)) {
      throw new Error(`Invalid time format: ${time}. Expected [HH:mm]`);
    }

    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  isValidTime(time: string): boolean {
    const regex = /^([01]\d|2[0-3]):[0-5]\d$/;

    return regex.test(time);
  }

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

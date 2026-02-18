import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly SALT_ROUNDS = 10;

  /**
   * Generates a hash for the given password.
   * @param password The password to hash.
   * @returns The generated hash.
   */
  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.debug('Error al generar el hash:', error);
      throw new InternalServerErrorException('Error al generar el hash');
    }
  }

  /**
   * Compares a password string with a hash.
   * @param password The password string to compare.
   * @param hash The hash to compare with.
   * @returns True if the password matches the hash, false otherwise.
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.debug('Error al comparar el hash:', error);
      throw new InternalServerErrorException('Error al comparar el hash');
    }
  }
}

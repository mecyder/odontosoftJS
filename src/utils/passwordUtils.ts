import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import * as bcrypt from 'bcrypt';

class PasswordUtils {
  async encriptar(password: string) {
    const SALT = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, SALT);
    return hash;
  }
  async desencriptar(
    passwordInDto: string,
    passwordInDb: string,
  ): Promise<boolean> {
    const IS_EQUAL = await bcrypt.compareSync(passwordInDto, passwordInDb);
    return IS_EQUAL;
  }
}
export const passwordUtils = new PasswordUtils();

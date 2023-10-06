import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  SALT = 10;
  async passwordhash(password: string) {
    const hash = await bcrypt.hash(password, this.SALT);
    return hash;
  }

  async passwordCompare(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}

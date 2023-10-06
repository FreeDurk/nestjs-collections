import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async passwordhash(password: string) {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async passwordCompare(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}

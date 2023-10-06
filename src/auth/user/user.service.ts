import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../utils/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private hashService: HashingService,
  ) {}

  async create(userDetails: CreateUserDto) {
    const password = await this.hashService.passwordhash(userDetails.password);

    return this.userRepo.save(
      this.userRepo.create({ ...userDetails, password }),
    );
  }
}

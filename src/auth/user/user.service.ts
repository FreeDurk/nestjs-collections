import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../utils/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private hashService: HashingService,
    private jwtService: JwtService,
  ) {}

  async currentUser(req: any) {
    return req.user;
  }
  async create(userDetails: CreateUserDto) {
    const password = await this.hashService.passwordhash(userDetails.password);

    return this.userRepo.save(
      this.userRepo.create({ ...userDetails, password }),
    );
  }

  async authPassportLocalValidate(email: string, pass: string) {
    var user = await this.userRepo.findOneBy({ email: email });

    if (!user) {
      return null;
    }

    const passwordCheck = await this.hashService.passwordCompare(
      pass,
      user.password,
    );

    if (!passwordCheck) {
      return null;
    }

    const { password, ...result } = user;

    return result;
  }

  async authJwtLogin(user: User) {
    const payload = { ...user };
    const token = this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}

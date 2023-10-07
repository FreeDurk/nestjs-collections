import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { HashingService } from '../utils/hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/User.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private hashService: HashingService,
    private jwtService: JwtService,
  ) {}
  async auth(credentials: AuthenticateDto) {
    const user = await this.userRepo.findOneBy({ email: credentials.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const checkPass = await this.hashService.passwordCompare(
      credentials.password,
      user.password,
    );

    if (!checkPass) {
      throw new UnauthorizedException();
    }

    const { password, ...userInfo } = user; //use @UseInterceptors(ClassSerializerInterceptor) and exclude passport on User Entity instead
    const payload = { id: user.id, userInfo };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}

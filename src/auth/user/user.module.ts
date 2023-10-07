import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashingService } from '../utils/hashing/hashing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { LocalStrategy } from '../passport/local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../passport/jwt/jwt.strategy';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [UserController],
  providers: [
    UserService,
    LocalStrategy,
    JwtStrategy,
    HashingService,
    JwtAuthService,
  ],
})
export class UserModule {}

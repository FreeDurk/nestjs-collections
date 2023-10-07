import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthController } from './jwt-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/User.entity';
import { HashingService } from '../utils/hashing/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [JwtAuthController],
  providers: [JwtAuthService, HashingService],
})
export class JwtAuthModule {}

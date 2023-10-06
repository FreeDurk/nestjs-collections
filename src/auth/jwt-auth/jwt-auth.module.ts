import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthController } from './jwt-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/User.entity';
import { HashingService } from '../utils/hashing/hashing.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'ericka', //dont do this
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [JwtAuthController],
  providers: [JwtAuthService, HashingService],
})
export class JwtAuthModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashingService } from '../utils/hashing/hashing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, HashingService],
})
@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}

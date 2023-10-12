import { Logger, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/auth/user/entity/User.entity';
import { UserCreatedEvent } from 'src/events/user-created.event';

@Injectable()
export class UserCratedListener {
  @OnEvent('user.created')
  handleUserCreated(user: User) {
    console.log(user);
  }
}

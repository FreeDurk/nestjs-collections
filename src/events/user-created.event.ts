import { OnEvent } from '@nestjs/event-emitter';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class UserCreatedEvent {
  name: string;
  email: string;
}

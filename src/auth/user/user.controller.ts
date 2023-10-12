import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { LocalGuard } from '../guards/local/local.guard';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { AuthenticateDto } from '../jwt-auth/dto/authenticate.dto';
import { JwtAuthGuard } from '../guards/jwt/jwt.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/events/user-created.event';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtAuthService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserDto) {
    const user = await this.userService.create(request);

    this.eventEmitter.emit('user.created', user);

    return user;
  }

  @Post('passport/local')
  @UseGuards(LocalGuard)
  async authPassportLocalValidate(
    @Request() request: any,
    @Body() details: AuthenticateDto,
  ) {
    return await this.jwtService.auth(details);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Request() req: any) {
    return req.user;
    // return this.userService.currentUser(req);
  }
}

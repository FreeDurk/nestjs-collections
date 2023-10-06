import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() request: CreateUserDto) {
    return this.userService.create(request);
  }

  @Get()
  @UseGuards(AuthGuard)
  getUser() {
    return 'good to go';
  }
}

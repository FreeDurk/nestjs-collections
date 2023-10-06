import { Controller, Post, Body } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('jwt-auth')
export class JwtAuthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Post()
  authenticate(@Body() request: AuthenticateDto) {
    return this.jwtAuthService.auth(request);
  }
}

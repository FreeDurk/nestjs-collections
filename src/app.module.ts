import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthModule } from './auth/jwt-auth/jwt-auth.module';
import { UserModule } from './auth/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './configModule/database.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    DatabaseConfigModule,
    // ConfigModule.forRoot({ isGlobal: true }),
    JwtAuthModule,
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

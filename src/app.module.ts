import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthModule } from './auth/jwt-auth/jwt-auth.module';
import { UserModule } from './auth/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user/entity/User.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_collections',
      entities: [User],
      synchronize: true,
    }),
    JwtAuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

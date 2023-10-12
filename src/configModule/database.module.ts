import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/auth/user/entity/User.entity';
import { Todo } from 'src/todo/entity/todo.entity';
import { TodoItem } from 'src/todo/entity/todo-items.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [User, Todo, TodoItem],
        synchronize: true, //dont use on production
      }),
    }),
  ],
})
export class DatabaseConfigModule {}

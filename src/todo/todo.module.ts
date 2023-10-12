import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { TodoItemsController } from './todo-items/todo-items/todo-items.controller';
import { TodoItemsService } from './todo-items/todo-items/todo-items.service';
import { TodoItem } from './entity/todo-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoItem])],
  controllers: [TodoController, TodoItemsController],
  providers: [TodoService, TodoItemsService],
})
export class TodoModule {}

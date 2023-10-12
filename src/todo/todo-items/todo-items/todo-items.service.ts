import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { TodoItem } from 'src/todo/entity/todo-items.entity';
import { Todo } from 'src/todo/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
@UseGuards(JwtAuthGuard)
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItem) private todoItemRepo: Repository<TodoItem>,
    @InjectRepository(Todo) private todoRepo: Repository<Todo>,
  ) {}

  async createTodoItems(todoItems: any) {
    const todo = await this.todoRepo.findOneBy({ id: todoItems.todoId });

    const todoItem = this.todoItemRepo.create({ ...todoItems, todo });

    return this.todoItemRepo.save(todoItem);
  }
}

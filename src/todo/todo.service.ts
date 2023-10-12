import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { todo } from 'node:test';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async createTodo(todo: CreateTodoDto) {
    const newTodo = await this.todoRepo.save(this.todoRepo.create({ ...todo }));

    return newTodo;
  }

  async getTodos(id: number, req: any) {
    const todos = this.todoRepo.find({
      where: {
        title: req.todoSearch ? Like(`%${req.todoSearch}%`) : null,
        todoItem: {
          title: req.todoItemSearch ? Like(`%${req.todoItemSearch}%`) : null,
        },
      },
      relations: {
        todoItem: req.todoItems,
      },
    });

    return todos;
  }
}

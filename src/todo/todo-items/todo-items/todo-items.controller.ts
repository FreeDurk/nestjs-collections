import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';

@Controller('todo-items')
export class TodoItemsController {
  constructor(private todoItemService: TodoItemsService) {}

  @Post()
  createTodoItem(@Body() todoItems: any) {
    return this.todoItemService.createTodoItems(todoItems);
  }
}

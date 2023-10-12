import {
  Controller,
  UseGuards,
  Post,
  Body,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt.guard';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() params: CreateTodoDto) {
    return this.todoService.createTodo(params);
  }

  @Get(':id')
  getTodos(@Param('id', ParseIntPipe) id: number, @Body() req: any) {
    return this.todoService.getTodos(id, req);
  }
}

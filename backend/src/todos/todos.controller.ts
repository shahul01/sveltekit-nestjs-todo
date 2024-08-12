import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import type { SupabaseRequest } from 'src/types';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Request() req: SupabaseRequest,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.create(req, createTodoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req: SupabaseRequest) {
    return this.todosService.findAll(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Request() req: SupabaseRequest, @Param('id') id: string) {
    return this.todosService.findOne(req, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}

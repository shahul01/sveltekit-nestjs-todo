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

type Req = {
  user: { id: string };
};

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req: Req) {
    const userId = req.user.id;
    console.log(`userId: `, userId);
    return this.todosService.create(createTodoDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req: Req) {
    const userId = req.user.id;
    return this.todosService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
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

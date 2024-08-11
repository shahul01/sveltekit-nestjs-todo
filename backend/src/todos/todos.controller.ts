import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
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

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  // , @Request() req: Req
  create(
    @Headers('Authorization') authHeader: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.create(createTodoDto, authHeader);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  // @Request() req: Request
  findAll(@Headers('Authorization') authHeader: string) {
    // let authHeader;
    // console.log(`authHeader Get: `, authHeader);
    // console.log(`##req: `, req['user']);
    return this.todosService.findAll(authHeader);
  }

  @UseGuards(AuthGuard('jwt'))
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

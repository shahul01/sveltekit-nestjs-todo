import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TodosService {

  constructor(private readonly supabaseService: SupabaseService) {}

  private todos: Todo[] = [
    // { id: '1', title: 'Task 1' },
    // { id: '2', title: 'Task 2' },
    // { id: '3', title: 'Task 3' },
  ];

  create(createTodoDto: CreateTodoDto) {
    const { id: reqTodoId, title: reqTodoTitle } = createTodoDto;

    const todo = new Todo();
    todo.id = reqTodoId;
    todo.title = reqTodoTitle;

    this.todos.push(createTodoDto);

    return `Todo successfully added with title ${createTodoDto.title}.`;
  }

  async findAll(): Promise<Todo[]> {
    type SBReturns = {
      data: Todo[];
      error: any;
    };
    const { data, error }: SBReturns = await this.supabaseService.supabase
      .from('todos')
      .select('*');
    if (error) throw new Error(error.message);
    console.log(`data: `, data);
    return data;
  }

  findOne(id: string): Todo {
    return this.todos.find((currTodo) => currTodo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

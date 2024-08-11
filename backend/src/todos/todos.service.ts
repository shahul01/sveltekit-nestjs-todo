import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';
import { PostgrestResponseSuccess } from '@supabase/postgrest-js';

@Injectable()
export class TodosService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private todos: Todo[] = [
    // { id: '1', title: 'Task 1' },
    // { id: '2', title: 'Task 2' },
    // { id: '3', title: 'Task 3' },
  ];

  async create(createTodoDto: CreateTodoDto) {
    const { id: reqTodoId, title: reqTodoTitle } = createTodoDto;

    const todo = new Todo();
    todo.id = reqTodoId;
    todo.title = reqTodoTitle;

    const { error } = await this.supabaseService.supabase
      .from('todos')
      .insert([todo]);
    if (error) throw new Error(error.message);

    return `Todo successfully added with title ${createTodoDto.title}.`;
  }

  async findAll(): Promise<Todo[]> {
    type SBFindAll = {
      data: Todo[];
      error: PostgrestError;
    };
    const { data, error }: SBFindAll = await this.supabaseService.supabase
      .from('todos')
      .select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string): Promise<Todo | null> {
    type SBFindOne = {
      data: Todo | null;
      error: PostgrestError;
    };
    const { data, error }: SBFindOne = await this.supabaseService.supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

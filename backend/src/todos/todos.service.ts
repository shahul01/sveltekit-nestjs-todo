import { PostgrestError } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SupabaseService } from '../supabase/supabase.service';
import type { SBFindAll, SBFindOne, SupabaseRequest } from 'src/types';

@Injectable()
export class TodosService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(req: SupabaseRequest, createTodoDto: CreateTodoDto) {
    const { title: reqTodoTitle } = createTodoDto;
    const userId = req.user?.id;

    const todo = new Todo();
    todo.title = reqTodoTitle;

    const { error } = await this.supabaseService.supabase
      .from('todos')
      .insert([{ ...todo, user_id: userId }]);
    if (error) throw new Error(error.message);

    return `Todo successfully added with title '${createTodoDto.title}'.`;
  }

  async findAll(req: SupabaseRequest): Promise<Todo[]> {
    const userId = req.user.id;
    console.log(`userId: `, userId);

    const { data, error }: SBFindAll = await this.supabaseService.supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
    // console.error(`error: `, error);
    // console.log(`data: `, data);

    return data;
  }

  async findOne(req: SupabaseRequest, id: string): Promise<Todo | null> {
    const { data, error }: SBFindOne = await this.supabaseService.supabase
      .from('todos')
      .select('*')
      // .eq('user_id', req.user.id)
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);

    return data;
  }

  async update(req: SupabaseRequest, id: string, updateTodoDto: UpdateTodoDto) {
    const todo = new Todo();
    todo.title = updateTodoDto.title;

    const { data, error } = await this.supabaseService.supabase
      .from('todos')
      .update([{ ...todo }])
      .eq('id', id)
      .select('*');
    if (error) throw new Error(error.message);

    // console.log(`data: `, data);

    return `Todo successfully deleted with title '${todo.title}'.`;
  }

  async remove(id: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);

    return `Todo successfully deleted with id '${id}'`;
  }
}

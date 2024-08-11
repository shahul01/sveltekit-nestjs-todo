import { PostgrestError } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodosService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    const { id: reqTodoId, title: reqTodoTitle } = createTodoDto;

    const todo = new Todo();
    todo.id = reqTodoId;
    todo.title = reqTodoTitle;

    const { error } = await this.supabaseService.supabase
      .from('todos')
      .insert([{ ...todo, user_id: userId }]);
    if (error) throw new Error(error.message);

    return `Todo successfully added with title ${createTodoDto.title}.`;
  }

  async findAll(authHeader: string): Promise<Todo[]> {
    // console.log(`request: `, request);
    // // @ts-expect-error 2339
    // const user = request.user;
    // console.log(`user: `, user);
    // const userId = user?.id;

    console.log(`authHeader: `, authHeader);
    type SBFindAll = {
      data: Todo[];
      error: PostgrestError;
    };

    const token = authHeader.split(' ')[1];
    const payload = this.jwtService.decode(token) as any;
    const userId = payload.sub;

    console.log(`userId: `, userId);
    if (!userId) return;

    const { data, error }: SBFindAll = await this.supabaseService.supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
    console.error(`error: `, error);
    console.log(`data: `, data);
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

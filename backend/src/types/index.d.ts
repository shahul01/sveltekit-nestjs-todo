import { PostgrestError } from '@supabase/supabase-js';
import type { Request } from 'express';
import { Todo } from 'src/todos/entities/todo.entity';

interface SupabaseRequest extends Request {
  user: {
    id: string;
  };
}

type SBFindAll = {
  data: Todo[];
  error: PostgrestError;
};

type SBFindOne = {
  data: Todo | null;
  error: PostgrestError;
};

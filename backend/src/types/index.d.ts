import type { Request } from 'express';

interface SupabaseRequest extends Request {
  user: {
    id: string;
  };
}

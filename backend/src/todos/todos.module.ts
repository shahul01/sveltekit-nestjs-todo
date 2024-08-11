import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [JwtStrategy, SupabaseModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

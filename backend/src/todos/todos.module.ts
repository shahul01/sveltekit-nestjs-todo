import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SupabaseModule, AuthModule],
  // JwtStrategy
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}

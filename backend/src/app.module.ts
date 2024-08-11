import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { SupabaseModule } from './supabase/supabase.module';
// import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    TodosModule,
  ],
  controllers: [AppController],
  // SupabaseService
  providers: [AppService],
})
export class AppModule {}

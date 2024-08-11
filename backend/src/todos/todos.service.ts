import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
    { id: '3', title: 'Task 3' },
  ];

  create(createTodoDto: CreateTodoDto) {
    const { id: reqTodoId, title: reqTodoTitle } = createTodoDto;

    const todo = new Todo();
    todo.id = reqTodoId;
    todo.title = reqTodoTitle;

    this.todos.push(createTodoDto);

    return `Todo successfully added with title ${createTodoDto.title}.`;
  }

  findAll(): Todo[] {
    return this.todos;
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

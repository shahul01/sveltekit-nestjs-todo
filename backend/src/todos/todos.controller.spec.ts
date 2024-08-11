import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should findAll', () => {
    expect(controller).toBeDefined();

    expect(controller.findAll()).not.toHaveLength(0);
    expect(controller.findAll()).toHaveLength(3);

    // TODO: add test that checks if values matches Entity
  });

  it('should findOne', () => {
    const expectedValue = { id: '1', title: 'Task 1' };

    expect(controller.findOne('1')).toEqual(expectedValue);
  });
});

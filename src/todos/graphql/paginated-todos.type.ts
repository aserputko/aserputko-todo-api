import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TodoType } from './todo.type.js';

@ObjectType('PaginatedTodos')
export class PaginatedTodosType {
  @Field(() => [TodoType])
  items: TodoType[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}

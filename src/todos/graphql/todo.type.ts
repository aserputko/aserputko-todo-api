import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { TodoStatus } from '../todo-status.enum.js';
import './todo-status.graphql.js';

@ObjectType('Todo')
export class TodoType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => TodoStatus)
  status: TodoStatus;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TodoStatus } from '../todo-status.enum.js';
import './todo-status.graphql.js';

@ArgsType()
export class ListTodosArgs {
  @Field(() => TodoStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  @Min(1)
  page: number = 1;

  @Field(() => Int, { defaultValue: 20 })
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number = 20;
}

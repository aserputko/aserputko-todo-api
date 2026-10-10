import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../todo-status.enum.js';
import './todo-status.graphql.js';

@InputType()
export class UpdateTodoInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => TodoStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}

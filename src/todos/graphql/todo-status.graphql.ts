import { registerEnumType } from '@nestjs/graphql';
import { TodoStatus } from '../todo-status.enum.js';

registerEnumType(TodoStatus, { name: 'TodoStatus' });

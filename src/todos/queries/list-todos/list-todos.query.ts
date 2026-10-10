import { TodoStatus } from '../../todo-status.enum.js';

export class ListTodosQuery {
  constructor(public readonly status?: TodoStatus) {}
}

import { TodoStatus } from '../../todo-status.enum.js';

export class ListTodosQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
    public readonly status?: TodoStatus,
  ) {}
}

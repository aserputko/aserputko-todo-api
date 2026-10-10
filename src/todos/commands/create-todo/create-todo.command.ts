import { TodoStatus } from '../../todo-status.enum.js';

export class CreateTodoCommand {
  constructor(
    public readonly title: string,
    public readonly description?: string,
    public readonly status?: TodoStatus,
  ) {}
}

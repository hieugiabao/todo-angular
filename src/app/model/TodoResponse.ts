import { Todo } from './Todo';
export interface TodoResponse {
  totalCount: number;
  currentPage: number;
  todos: Todo[];
}

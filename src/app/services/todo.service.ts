import { TodoResponse } from './../model/TodoResponse';
import { TodoRequest } from './../model/TodoRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from '../model/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoUrl: string = 'http://localhost:8000/api/v1/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTodos(todoRequest: TodoRequest): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(
      `${this.todoUrl}/get`,
      todoRequest,
      this.httpOptions
    );
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.todoUrl}/${id}`);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(`${this.todoUrl}`, todo, this.httpOptions)
      .pipe(tap((todo) => console.log(todo)));
  }

  updateTodo(id: string, todo: Todo): Observable<any> {
    console.log(todo);
    return this.http.put(this.todoUrl, todo, this.httpOptions);
  }

  deleteTodo(id: number): Observable<any> {
    const result = this.http.delete<any>(
      this.todoUrl + `/${id}`,
      this.httpOptions
    );
    return result;
  }
}

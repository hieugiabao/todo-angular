import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { TodoRequest } from './../../model/TodoRequest';
import { TodoResponse } from './../../model/TodoResponse';
import { TodoService } from './../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todoResponse: TodoResponse = {
    todos: [],
    totalCount: 0,
    currentPage: 0,
  };
  pageSize = 5;
  query: string = '';

  constructor(
    private router: Router,
    private todoService: TodoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTodos({ page: 0 });
  }

  getTodos(todoRequest: TodoRequest): void {
    this.todoService
      .getTodos(todoRequest)
      .subscribe((todoResponse) => (this.todoResponse = todoResponse));
  }

  nextTo(link: string): void {
    this.router.navigate([link]);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe();
    this.dialog.closeAll();
    this.todoResponse.todos = this.todoResponse.todos.filter(
      (todo) => todo.id !== id
    );
  }

  openDialog(id: number): void {
    const data = {
      id,
      successHandler: this.deleteTodo.bind(this),
    };
    this.dialog.open(DialogComponent, {
      data,
    });
  }

  onClick(e: PageEvent): void {
    this.getTodos({
      page: e.pageIndex,
      pageSize: e.pageSize,
      query: this.query,
    });
  }

  find(): void {
    this.getTodos({ page: 0, pageSize: this.pageSize, query: this.query });
  }
}

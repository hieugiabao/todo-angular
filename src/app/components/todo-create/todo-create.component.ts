import { Todo } from './../../model/Todo';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {}

  addNewTodo(title: string, content: string): void {
    this.todoService
      .addTodo({ title, content } as Todo)
      .subscribe((todo) => console.log('da them viec moi'));
    this.router.navigate(['/']);
  }
}

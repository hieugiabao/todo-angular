import { TodoService } from './../../services/todo.service';
import { Todo } from './../../model/Todo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit {
  todo?: Todo;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getTodo();
    this.loading = false;
  }

  getTodo(): void {
    this.todoService
      .getTodo(this.route.snapshot.paramMap.get('id') as string)
      .subscribe((todo) => (this.todo = todo));
  }

  update(todo: Todo) {
    this.todoService
      .updateTodo(this.route.snapshot.paramMap.get('id') as string, todo)
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}

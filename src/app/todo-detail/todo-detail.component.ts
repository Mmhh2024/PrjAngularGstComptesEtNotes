/*import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../model';
import { TodoService } from '../todo/todo.service';
import { TodoHttpService } from '../todo/todo-http.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent {
  id?: number;
  todoCurrent?: Todo;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private todoHttpService: TodoHttpService) {
    this.route.params.subscribe((params) => {
      // this.todoCurrent = this.todoService.findById(params['id']);
      this.todoHttpService.findById(params['id']).subscribe(resp => {
        this.todoCurrent = resp;
      });
    });

    // this.route.params.subscribe(this.paramsRecus); // exemples avec une fonction nommée


   
  }

  paramsRecus(parametres: any) {
    // this.todoCurrent = this.todoService.findById(parametres['id']);
    this.todoHttpService.findById(parametres['id']).subscribe(resp => {
      this.todoCurrent = resp;
    });

    // for(let todo of this.todoService.findAll()) {
    //   if(todo.id == parametres['id']) {
    //     this.todoCurrent = todo;
    //     break;
    //   }
    // }


  }


}*/

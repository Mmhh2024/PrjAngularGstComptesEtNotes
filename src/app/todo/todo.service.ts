import { Injectable } from '@angular/core';
import { Todo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Array<Todo> = new Array<Todo>();

  constructor() {
    this.todos.push(new Todo(6, "Faire le repassage", false));
    this.todos.push(new Todo(8, "Passer la tondeuse", true));
    this.todos.push(new Todo(9, "Aspirer", true));
  }

  findAll(): Array<Todo> {
    return this.todos;
  }

  findById(id?: number): Todo| undefined {
    return this.todos.find(t => t.id == id);
  }

  create(todo: Todo) {
    let max = 0;
    for(let t of this.todos) {
      if(t.id && t.id > max) {
        max = t.id;
      }
    }
    todo.id = ++max;
    this.todos.push(todo);
  }

  update(todo: Todo) {
    let position = this.todos.findIndex(t => t.id == todo.id);

    this.todos[position] = todo;
  }

  delete(id?: number) {
    let position = this.todos.findIndex(t => t.id == id);

    // let positionAlt;
    // for(let i=0;i<this.todos.length;i++) {
    //   if(this.todos[i] == id) {
    //     positionAlt = i;
    //     break;
    //   }
    // }

    this.todos.splice(position, 1); // argument 1 (position): début de la suppression - argument 2 (1) : nombre d'éléments à supprimer
  }
}

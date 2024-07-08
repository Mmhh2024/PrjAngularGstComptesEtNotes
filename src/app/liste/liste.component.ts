import { Component } from '@angular/core';
import { Liste } from '../model';
import { ListeHttpService } from './liste-http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent {
  liste$!: Observable<Liste[]>;

  listeForm?: Liste;

  constructor(private listeHttpService: ListeHttpService) {
    this.load() ;
  }

  load() {
    this.liste$ = this.listeHttpService.findAll();
  }

  save() {
    if(this.listeForm) {
      if(this.listeForm?.id) { // modification
        this.listeHttpService.update(this.listeForm).subscribe(resp => {
          this.load();
        });
      } else { // création
        this.listeHttpService.create(this.listeForm).subscribe(resp => {
          this.load();
        });
      }
    }

    this.listeForm = undefined;
  }

  list() {
    return this.liste$;
  }

  add() {
    this.listeForm = new Liste();
  }

  edit(id?: number) {
    this.listeHttpService.findById(id).subscribe(response => {
      this.listeForm = response;
    });
  }

  remove(id?: number) {
    this.listeHttpService.delete(id).subscribe(resp => {
      this.load();
    });
  }

  cancel() {
    this.listeForm = undefined;
  }
}

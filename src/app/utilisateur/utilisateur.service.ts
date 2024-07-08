import { Injectable } from '@angular/core';
import { Utilisateur } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  utilisateurs: Array<Utilisateur> = new Array<Utilisateur>();
  dateBirth: Date = new Date('2000-01-01');
  dateInscription: Date = new Date('2024-07-01');
  constructor() {
    
    this.utilisateurs.push(new Utilisateur(1, "AZID", "USER",this.dateBirth, "hazid@mail.fr", "123456", "motprimaireun",this.dateInscription));
    this.utilisateurs.push(new Utilisateur(2, "SULTAN","USER", this.dateBirth, "esultan@mail.fr", "123456", "motprimairedeux",this.dateInscription));
  }

  findAll(): Array<Utilisateur> {
    return this.utilisateurs;
  }

  findById(id?: number): Utilisateur| undefined {
    return this.utilisateurs.find(t => t.id == id);
  }

  create(utilisateur: Utilisateur) {
    let max = 0;
    for(let t of this.utilisateurs) {
      if(t.id && t.id > max) {
        max = t.id;
      }
    }
    utilisateur.id = ++max;
    this.utilisateurs.push(utilisateur);
  }

  update(utilisateur: Utilisateur) {
    let position = this.utilisateurs.findIndex(t => t.id == utilisateur.id);

    this.utilisateurs[position] = utilisateur;
  }

  delete(id?: number) {
    let position = this.utilisateurs.findIndex(t => t.id == id);

    this.utilisateurs.splice(position, 1);
  }
}

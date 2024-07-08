import { Component } from '@angular/core';
import { Utilisateur } from '../model';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurHttpService } from './utilisateur-http.service';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent {
  utilisateurForm?: Utilisateur = undefined;

  constructor(private utilisateurHttpService: UtilisateurHttpService) {
  }

  list() {
    return this.utilisateurHttpService.findAll();
  }

  edit(id?: number) {
    this.utilisateurHttpService.findById(id).subscribe(resp => {
      this.utilisateurForm = resp;
    });

  }

  add() {
    this.utilisateurForm = new Utilisateur();
  }

  save() {
    // elle va utiliser les informations synchronisées depuis le formulaire vers la variable utilisateurForm
    // si l'id est renseigné (modification), vous devez écraser la cellule (position) du tableau qui correspondent aux mêmes ID
    
    // sinon (création), vous devez rechercher l'id le plus grand du tableau afin d'affecter l'incrément de celui-ci dans le nouvel objet utilisateurForm
    // puis le rajouter dans le tableau

    if(this.utilisateurForm) {
      if(this.utilisateurForm?.id) {
        this.utilisateurHttpService.update(this.utilisateurForm);
      } else {
        this.utilisateurHttpService.create(this.utilisateurForm);
      }
      this.utilisateurForm = undefined;
    }
  }

  cancel() {
    this.utilisateurForm = undefined;
  }

  remove(id?: number) {
    // rechercher par l'id, la position de l'objet à supprimer 
    // effectuer la suppression sur le tableau avec la méthodse splice

    this.utilisateurHttpService.delete(id);
  }
}

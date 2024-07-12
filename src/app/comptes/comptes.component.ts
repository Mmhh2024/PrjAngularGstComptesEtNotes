import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { ComptesService } from '../comptes.service';
import { Comptes, Utilisateur } from '../model';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrl: './comptes.component.css'
})
export class ComptesComponent implements OnInit {

  user?: Utilisateur ;


    //notes!:   Observable<Notes[]> ;
    //notes$: Notes[] = [];
    comptes$!: Observable<Comptes[]> ;
    comptesForm?: Comptes;
    errorMessage: string = '';

    constructor(
      private http: HttpClient, 
      private comptesService: ComptesService,
      private authService: AuthService,
      private router: Router
    ) { }
    ngOnInit(): void {
      console.log("dans init de notes");
      if (this.authService.isLoggedIn()) {
        console.log("Utilisateur connecté");
        this.user = this.authService.getUser();
        if (this.user != null) {
          console.log("Utilisateur : ", this.user.name);
          if (this.user.id){
            this.loadComptes(this.user.id);
          }
        } else {
          console.error("Erreur : utilisateur non trouvé");
          this.router.navigate(['/login']);
        }
      } else {
        console.error("Utilisateur non connecté");
        this.router.navigate(['/login']);
      }
     /* if (this.authService.isLoggedIn()) {
        console.log("init" );
        this.user = this.authService.getUser();
        if( this.user != null){
           console.log(this.user.name);
        }
        this.loadNotes();
      } else {
        this.router.navigate(['/login']);
      }*/
    }
    loadComptes(id: number){
      console.log("in load notes" );
      
      if ( id )
        this.comptes$ = this.comptesService.getComptesByUserId(id).pipe(
          catchError((error: any) => {
            this.errorMessage = error;
            return of([]); // retourner un Observable vide en cas d'erreur
          })
        );
      
    }
    list(){
      return this.comptes$;

    }
  
    remove(id: number): void {
      this.comptesService.deleteCompteById(id).subscribe(
        response => {
          console.log('Compte deleted successfully');
          if (this.user!= null && this.user.id != null) {
            this.loadComptes(this.user.id); // Reload the notes list after deletion
          }
        },
        error => {
          console.error('Error deleting note:', error);
        }
      );
    }
    add(idUser: number){
        if (idUser !== undefined) {
          // Naviguer vers ComptesDetailComponent avec l'ID de l'utilisateur
          this.router.navigate(['/comptes-detail', idUser, 'new']);
        } else {
          console.error('User ID is undefined');
        }
    }
    edit(  id: number | undefined): void {

      if (id !== undefined && this.user && this.user.id !== undefined) {
        this.router.navigate(['/comptes-detail', this.user.id, id]);
      } else {
        console.error('ID or user ID is undefined');
      }

    }

    private handleError(error: any):void {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.status === 401) {
          errorMessage = 'Invalid utilisateur';
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
      //return throwError(errorMessage);
      console.error(errorMessage);
      this.errorMessage = errorMessage;
    }
}

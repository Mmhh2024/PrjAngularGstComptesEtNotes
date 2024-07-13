import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../environments/environment';
import { Notes, Utilisateur } from '../model';
import { NotesService } from '../notes.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

  export class NotesComponent implements OnInit {
  
    user?: Utilisateur ;
    //notes!:   Observable<Notes[]> ;
    //notes$: Notes[] = [];
    notes$!: Observable<Notes[]> ;
    notesForm?: Notes;
   // utilisateurs: Array<Utilisateur> = new Array<Utilisateur>();
    errorMessage: string = '';
  
    constructor(
      private http: HttpClient, 
      private notesService: NotesService,
      private authService: AuthService,
      private router: Router
    ) { }
  

  private baseUrl = environment.apiUrlNotes ;


  
  
  ngOnInit(): void {
    console.log("dans init de notes");
    if (this.authService.isLoggedIn()) {
      console.log("Utilisateur connecté");
      this.user = this.authService.getUser();
      if (this.user != null) {
        console.log("Utilisateur : ", this.user.name);
        if (this.user.id){
        this.loadNotes(this.user.id);
       }
      
      } else {
        console.error("Erreur : utilisateur non trouvé");
        this.router.navigate(['/login']);
      }
    } else {
      console.error("Utilisateur non connecté");
      this.router.navigate(['/login']);
    }
  }

  loadNotes(id: number) {
    // Logique pour charger les notes de l'utilisateur en utilisant `this.user`
      // Par exemple, faire une requête HTTP au backend pour obtenir les notes
      // this.noteService.getNotesByUserId(this.user.id).subscribe(notes => { this.notes = notes; });
    
    console.log("in load notes" );
    if ( id )
    this.notes$ = this.notesService.getNotesByUserId(id).pipe(
      catchError((error: any) => {
        this.errorMessage = error;
        return of([]); // retourner un Observable vide en cas d'erreur
      })
    );
    
  }
  list() {
    return this.notes$;
  }
    
     
   /*edit(  id: number | undefined): void {

      if (id !== undefined && this.user && this.user.id !== undefined) {
        this.router.navigate(['/notes-detail', this.user.id, id]);
      } else {
        console.error('ID or user ID is undefined');
      }

    }*/ 

    edit(id: number | undefined): void {
      if (id !== undefined && this.user && this.user.id !== undefined) {
        this.router.navigate(['/notes-detail', this.user.id, id ]);
       
      } else {
        console.error('ID or user ID is undefined');
      }
    }

    remove(id: number): void {
      this.notesService.deleteNoteById(id).subscribe(
        response => {
          console.log('Note deleted successfully');
          if (this.user!= null && this.user.id != null) {
            this.loadNotes(this.user.id); // Reload the notes list after deletion
          }
        },
        error => {
          console.error('Error deleting note:', error);
        }
      );
    }
    add(idUser: number | undefined){
      if (idUser !== undefined) {
        // Naviguer vers ComptesDetailComponent avec l'ID de l'utilisateur
        console.log("in add");
        this.router.navigate(['/notes-detail', idUser, 'new']);
      } else {
        console.error('Identifiant utilisateur manquant');
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

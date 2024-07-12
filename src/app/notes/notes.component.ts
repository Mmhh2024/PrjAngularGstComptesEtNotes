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

    /*if (this.user && this.user.id) {
      this.notesService.getNotesByUserId(this.user.id); //.subscribe(

      this.notes$.subscribe(
        (notes: Notes[]) => {
          // Succès : notes contient les notes de l'utilisateur
          console.log(notes);
        },
        (error: any) => {
          this.errorMessage = error;
          // Gestion de l'erreur : afficher un message d'erreur à l'utilisateur ou rediriger, etc.
        }
      );
    } else{
      this.errorMessage = "Identifiant null";
    }*/
    
  }
  list() {
    return this.notes$;
  }
    /*loadNotes() {
      // Logique pour charger les notes de l'utilisateur en utilisant `this.user`
      // Par exemple, faire une requête HTTP au backend pour obtenir les notes
      // this.noteService.getNotesByUserId(this.user.id).subscribe(notes => { this.notes = notes; });
      console.log("in notes" );
      tmpPath = this.baseUrl + "/";
      userId = this.user.id;
      return this.http.get(`${this.baseUrl}/login`, credentials).pipe(
        catchError(this.handleError);
    } */
     edit(id: number){

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
    add(id: number | undefined){
  /* if(this.NotesForm) {
      if(this.NotesForm?.id) { // modification
        this.notesService.update(this.notesForm).subscribe(resp => {
          this.load();
        });
      } else { // création
        this.notesService.create(this.NotesForm).subscribe(resp => {
          this.load();
        });
      }
    }

    this.NotesForm = undefined;
  */
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

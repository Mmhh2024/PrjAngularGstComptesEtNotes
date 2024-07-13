import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './environments/environment';
import { ModifyNoteRequest, NoteCreateRequest, Notes } from './model';
// HttpClient, HttpParams, HttpErrorResponse, Observable, throwError, catchError, et Notes
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  //  apiUrlNotes : "http://localhost:8080/api/user/notes", /api/user/notes
  private baseUrl = environment.apiUrlNotes ;


  constructor(private http: HttpClient , private authService: AuthService) { }


  getNotesByUserId(idUtilisateur: number): Observable<Notes[]> {
    /* return this.http.get<Notes[]>(`${this.baseUrl}/allnotesuser`, { params }).pipe(
      catchError(this.handleError)
      */
     const params = new HttpParams().set('idUtilisateur', idUtilisateur.toString());
     
    //return this.http.get(`${this.baseUrl}`, { params });
    console.log ("in Notes lecture");
    return this.http.get<Notes[]>(`${this.baseUrl}`, { params });
  
  }
  getNotesById(id:number): Observable<Notes> {
    const params = new HttpParams().set('idNote', id.toString());
    return this.http.get<Notes>(`${this.baseUrl}/note`, { params });

  }
  createNote(note:NoteCreateRequest):Observable<any>{

    //const params = { id: id.toString() };
    return this.http.post(`${this.baseUrl}`,note);
  }
  modifyNote(note:ModifyNoteRequest, id:number  | undefined):Observable<any>{
    console.log("test");
    if (id !== undefined && id !== null) { // Vérifiez que id n'est ni undefined ni null
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('id', id.toString()); // Créez les paramètres de requête
       console.log("OK");
      // Utilisation de HttpClient pour envoyer une requête PUT
      return this.http.put(`${this.baseUrl}`, note, { headers, params }).pipe(
        catchError((error: any) => {
          console.error('Error modifying compte:', error);
          return throwError('Failed to modify compte'); // Gestion des erreurs avec catchError
        })
      );
    } else {
      // Si id est undefined ou null, retournez un Observable d'erreur
      return throwError('ID is undefined or null');
    }
   
  }
  deleteNoteById(id: number): Observable<any> {
    const params = { id: id.toString() };
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}

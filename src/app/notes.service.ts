import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './environments/environment';
import { Notes } from './model';
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
  deleteNoteById(id: number): Observable<any> {
    const params = { id: id.toString() };
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}

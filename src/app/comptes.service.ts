import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './environments/environment';
import { CompteCreateRequest, Comptes } from './model';

@Injectable({
  providedIn: 'root'
})
export class ComptesService {
  private baseUrl = environment.apiUrlComptes ;


  constructor(private http: HttpClient , private authService: AuthService) { }


  getComptesByUserId(idUtilisateur: number): Observable<Comptes[]> {
    /* return this.http.get<Notes[]>(`${this.baseUrl}/allnotesuser`, { params }).pipe(
      catchError(this.handleError)
      */
     const params = new HttpParams().set('idUtilisateur', idUtilisateur.toString());
    //return this.http.get(`${this.baseUrl}`, { params });
    console.log ("in Notes lecture");
    return this.http.get<Comptes[]>(`${this.baseUrl}/utilisateur`, { params });
  
  }
  
  createCompte(compte:CompteCreateRequest):Observable<any>{

    //const params = { id: id.toString() };
    return this.http.post(`${this.baseUrl}`,compte);
  }
  deleteCompteById(id:number): Observable<any> {
    const params = { id: id.toString() };
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}

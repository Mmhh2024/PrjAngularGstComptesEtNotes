import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './environments/environment';
import { CompteCreateRequest, Comptes, ModifyCompteRequest } from './model';

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
  getComptesById(id:number): Observable<Comptes> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Comptes>(`${this.baseUrl}/compte`, { params });

  }
  
  createCompte(compte:CompteCreateRequest):Observable<any>{

    //const params = { id: id.toString() };
    return this.http.post(`${this.baseUrl}`,compte);
  }
  modifyCompte(compte:ModifyCompteRequest, id:number  | undefined):Observable<any>{
    console.log("test");
    if (id !== undefined && id !== null) { // Vérifiez que id n'est ni undefined ni null
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('id', id.toString()); // Créez les paramètres de requête
       console.log("OK");
      // Utilisation de HttpClient pour envoyer une requête PUT
      return this.http.put(`${this.baseUrl}`, compte, { headers, params }).pipe(
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

  deleteCompteById(id:number): Observable<any> {
    const params = { id: id.toString() };
    return this.http.delete(`${this.baseUrl}`, { params });
  }
}

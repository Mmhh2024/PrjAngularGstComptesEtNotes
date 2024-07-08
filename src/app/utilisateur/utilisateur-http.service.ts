import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurHttpService {

  private utilisateurs: Array<Utilisateur> = new Array<Utilisateur>();

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<Utilisateur[]>("http://localhost:8080/api/utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    });
  }

  findAll(): Utilisateur[] {
    return this.utilisateurs;
  }

  findById(id?: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(environment.apiUrl + "/utilisateur/"+id);
  }

  create(utilisateur: Utilisateur): void {
    this.http.post<Utilisateur>(environment.apiUrl + "/utilisateur", utilisateur).subscribe(resp => {
      this.load();
    });
  }

  update(utilisateur: Utilisateur): void {
    this.http.put<Utilisateur>(environment.apiUrl + "/utilisateur/"+utilisateur.id, utilisateur).subscribe(resp => {
      this.load();
    });
  }

  delete(id?: number): void {
    this.http.delete<void>(environment.apiUrl + "/utilisateur/"+id).subscribe(resp => {
      this.load();
    });
  }

  inscription(inscriptionUser: any): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(environment.apiUrl + "/utilisateur/inscription", inscriptionUser);
 }
}

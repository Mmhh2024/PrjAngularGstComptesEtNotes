import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liste } from '../model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListeHttpService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Liste[]> {
    return this.http.get<Liste[]>(environment.apiUrl + "/liste");
  }

  findById(id?: number): Observable<Liste> {
    return this.http.get<Liste>(environment.apiUrl + "/liste/"+id);
  }

  create(liste: Liste): Observable<Liste> {
    return this.http.post<Liste>(environment.apiUrl + "/liste", liste);
  }

  update(liste: Liste): Observable<Liste> {
    return this.http.put<Liste>(environment.apiUrl + "/liste/"+liste.id, liste);
  }

  delete(id?: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + "/liste/"+id);
  }
}

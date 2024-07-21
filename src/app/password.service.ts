import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {

 
  constructor(private http: HttpClient) { }

  verifyPwd(password: string): Observable<Boolean> { 
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    ///api/user/password? apiUrlPwd : "http://localhost:8080/api/user/password"
    console.log("verif service"+ password);
    //private    bool  = false;
    
    const url = `${environment.apiUrlPwd}`; //?password=${password}
    const params = new HttpParams().set('password', password);
     
    return this.http.get<Boolean>(url, { params });
    alert('Le mot de passe est: ' + password);
      /*verifyPwd(hashedPassword: string): Observable<Boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Boolean>(`${this.apiUrl}?password=${hashedPassword}`, { headers });
  }
      */
  }

}

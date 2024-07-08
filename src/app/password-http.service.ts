import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordHttpService {

  public pwdClear: string | undefined;
  constructor(private http: HttpClient) { 
    this.load();
  }


  load() {

  }

  
  verifyPwd2(pwdClear?: string): Observable<Boolean> {
    return this.http.get<Boolean>(environment.apiUrlPwd + "/"+pwdClear);
  }
}

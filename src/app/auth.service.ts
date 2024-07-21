import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './environments/environment';
import { UserCreateRequest, Utilisateur } from './model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private utilisateur?: Utilisateur = undefined;
  private baseUrl = environment.apiUrl ;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient , private router: Router) {
    const user = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();

    //this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    //this.currentUser = this.currentUserSubject.asObservable();
  }
  

    register(user: UserCreateRequest): Observable<any> {
      console.log("in register");
      
      console.log(user);
      const apiRegisterUrl = this.baseUrl + '/inscription';
      console.log( apiRegisterUrl );
      //const password =  user.password;
      //const encodedPassword = encodeURIComponent(password);  
      //user.password = encodedPassword;

      return this.http.post(apiRegisterUrl, user).pipe(
        catchError(this.handleError)
      );
    }
 
      login(email: string, password: string): Observable<any> {

        const apiLoginUrl = this.baseUrl + '/login';
        console.log("in login" + email + "- password " + password);
        console.log(this.baseUrl);
        const params = new HttpParams()
          .set('email', email)
          .set('password', password); 
        return this.http.get( apiLoginUrl , { params  }).pipe(
          map(user => {
            // Stocker les informations de l'utilisateur dans le sessionStorage
            if (user ) { //&& user.id) {
              sessionStorage.setItem('currentUser', JSON.stringify(user));
              //console.log(user)
            }
            return user;
          }),
          catchError(this.handleError)
          
        );
      }

  isLoggedIn(): boolean {
    //console.log( "in LigginedIn"+ localStorage.getItem('user') !== null);
    return sessionStorage.getItem('currentUser') !== null;
  }


  isLogged(): boolean {

    return localStorage.getItem('currentUser') !== null;
  }

  getUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 401) {
        errorMessage = 'Invalid email or password';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}

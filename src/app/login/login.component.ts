import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.emailCtrl = this.formBuilder.control("", Validators.required);
    this.passwordCtrl = this.formBuilder.control("", [Validators.required, Validators.minLength(6)]);

    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });

    // Autre méthode
    // this.loginForm = this.formBuilder.group({
    //   username: this.formBuilder.control("", Validators.required),
    //   password: this.formBuilder.control("", [Validators.required, Validators.minLength(5)])
    // });
  }

  connexion() {
    console.log("connexion");
    this.credentials.email = this.emailCtrl.value;
    
    const encodedPassword = encodeURIComponent(this.passwordCtrl.value  );
    this.credentials.password = encodedPassword; // this.passwordCtrl.value;
   
    //this.authService.login(this.emailCtrl.value,this.passwordCtrl.value ).subscribe(response => {
      this.authService.login(this.emailCtrl.value,encodedPassword ).subscribe(response => {
      
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/comptes']);
    },
    (error: any) => {
      console.error('Erreur de connexion:', error);
      this.errorMessage = error;
      alert("identifiant et/ou password erronés");
    });

  }
  getEncodedPassword(): string {
    return encodeURIComponent(this.passwordCtrl.value);
  }

  getDecodedPassword(encodedPassword: string): string {
    return decodeURIComponent(encodedPassword);
  }
}

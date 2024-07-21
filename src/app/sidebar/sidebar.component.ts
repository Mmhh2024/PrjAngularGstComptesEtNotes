import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { PasswordService } from '../password.service';
// npm install crypto-js
// npm install --save-dev @types/crypto-js
@Component({
  selector: 'side-bar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  password: string = '';
  message: string = '';
  hashedPassword: string = '';
  result: Boolean = false;

  constructor(private apiPwdService: PasswordService) {}

  hashPassword(password: string): string {
    return CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
  }
  verifPwd() {
    this.hashedPassword = this.hashPassword(this.password);
    console.log("in verifPwd");
    console.log(this.hashedPassword);
    this.message = "";

    this.apiPwdService.verifyPwd(this.hashedPassword).subscribe(
      response => {
        console.log('Réponse de l\'API:', response);
        if (response) {
          console.log("Le password a été volé");
          this.message = "Le password a été volé";
          alert('Le mot de passe ' + this.password + ' a été volé');
        } else {
          console.log("Le password n'a pas été volé");
          this.message = "Le password n'a pas été volé";
          alert('Le mot de passe  ' + this.password + ' n\'a pas été volé');
        }
      },
      error => {
        console.error('Erreur système:', error);
      }
    );
  }
  

}

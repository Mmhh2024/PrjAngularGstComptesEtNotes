import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { catchError, Observable, of } from 'rxjs';
import { ComptesService } from '../comptes.service';
import { CompteCreateRequest, Comptes, ModifyCompteRequest } from '../model';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-comptes-detail',
  templateUrl: './comptes-detail.component.html',
  styleUrl: './comptes-detail.component.css'
})
export class ComptesDetailComponent implements OnInit{
  id: number | undefined;
  idUser: number | undefined;
  isEditMode: boolean = false;
  comptes$!: Observable<Comptes > ;
  message: string ="";
  hashedPassword: string = "";

  compteForm!: FormGroup;
  idForm!:FormControl;
  utilisateurIdForm!: FormControl;
  platformnameCtrl!: FormControl;
  descriptionCtrl!: FormControl;
  userNameCtrl!: FormControl;
  emailCtrl!: FormControl;
  adressUrlCtrl!: FormControl;
  passwordCtrl!: FormControl;
  
  
  compteCreate: CompteCreateRequest = {
                utilisateurId: 0,
                platformname: '',
                description: '',
                userName:'',
                email: '',
                adressUrl:'',
                password: '' ,
              };
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private comptesService: ComptesService,
    private apiPwdService: PasswordService
  ) {
    this.compteForm = this.formBuilder.group({
      id: [''],
      platformname: [''],
      description: [''],
      dateAdded: [''],
      dateUpdate: [''],
      userName: [''],
      email: [''],
      adressUrl: [''],
      password: [''],
      utilisateurId: ['']
    });
  }
  ngOnInit(): void {
    // Récupérer les IDs depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const idUserParam = params.get('idUser');
      this.message = "";

      if (idUserParam) {
        this.idUser = +idUserParam;
      } else {
        console.error('User ID is null');
        // Handle the null case here, for example, navigate away or show an error message.
        return;
      }

      if (idParam && idParam !== 'new') {
        this.id = +idParam; // Convert to number
        this.isEditMode = true;
        this.loadCompte(this.id);
       
      } else {
        this.id = undefined;
        this.isEditMode = false;
      }

      console.log(`User ID: ${this.idUser}, ID: ${this.id}, Edit Mode: ${this.isEditMode}`);
      this.platformnameCtrl = this.formBuilder.control('', Validators.required);
      this.descriptionCtrl = this.formBuilder.control('');
      this.userNameCtrl = this.formBuilder.control('', Validators.required);
      this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
      this.adressUrlCtrl = this.formBuilder.control('');
      this.passwordCtrl = this.formBuilder.control('', Validators.required);
  
      this.compteForm = this.formBuilder.group({
        platformname: this.platformnameCtrl,
        description: this.descriptionCtrl,
        userName: this.userNameCtrl,
        email: this.emailCtrl,
        adressUrl: this.adressUrlCtrl,
        password: this.passwordCtrl,
      });
    });
  }

  updateForm(compte: Comptes): void {
    this.compteForm.patchValue({
      id: compte.id,
      platformname: compte.platformname,
      description: compte.description,
      dateAdded: compte.dateAdded,
      dateUpdate: compte.dateUpdate,
      userName: compte.userName,
      email: compte.email,
      adressUrl: compte.adressUrl,
      password: compte.password,
      utilisateurId: compte.utilisateurId
    });
  }
  loadCompte(id: number): void {
 

      this.comptesService.getComptesById(id).pipe(
        catchError((error: any) => {
          this.errorMessage = error;
          return of(null);
        })
      ).subscribe((compte: Comptes | null) => {
        if (compte) {
          //this.comptes$ = compte;
          this.updateForm(compte);
        }
      });

  }


  cancel(){
    this.router.navigate(['/comptes']);
  }
  onSubmit(): void {
    if (this.compteForm.valid ) {
      //if ( this.isEditMode == false ) {
      if (!this.isEditMode) {
        const newCompte: CompteCreateRequest = {
          utilisateurId: this.idUser,
          platformname: this.platformnameCtrl.value,
          description: this.descriptionCtrl.value,
          userName: this.userNameCtrl.value,
          email: this.emailCtrl.value,
          adressUrl: this.adressUrlCtrl.value,
          password: this.passwordCtrl.value,
        };

        this.comptesService.createCompte(newCompte).subscribe(
          response => {
            console.log('Compte created successfully:', response);
            this.router.navigate(['/comptes']);
          },
          error => {
            console.error('Error creating compte:', error);
          }
        );
      }
    else{
     
      const compte: ModifyCompteRequest = {
      id: this.id,
      utilisateurId: this.idUser,
      platformname: this.platformnameCtrl.value,
      description: this.descriptionCtrl.value,
      userName: this.userNameCtrl.value,
      email: this.emailCtrl.value,
      adressUrl: this.adressUrlCtrl.value,
      password: this.passwordCtrl.value,
      }
      console.log ("mise a jour compte");
      
      this.comptesService.modifyCompte(compte, this.id).subscribe(
        response => {
          console.log('Compte mis à jour avec succès:', response);
          this.router.navigate(['/comptes']);
        },
        error => {
          console.error('Erreur lors de la mise à jour du compte:', error);
          this.message = "Erreur lors de la mise à jour du compte";
        }
      );
      
      
    }
  } else{
    console.log("data non valide");
  }
  }
  hashPassword(password: string): string {
    return CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
  }
  verifyPwd(pwd: string ) {
    this.hashedPassword = this.hashPassword(pwd);
    console.log("in verifPwd");
    console.log(this.hashedPassword);
    this.message = "";

    this.apiPwdService.verifyPwd(this.hashedPassword).subscribe(
      response => {
        console.log('Réponse de l\'API:', response);
        if (response) {
          console.log("Le password a été volé");
          this.message = "Le password a été volé";
          alert('Le mot de passe ' + pwd + ' a été volé');
        } else {
          console.log("Le password n'a pas été volé");
          this.message = "Le password n'a pas été volé";
          alert('Le mot de passe  ' + pwd + ' n\'a pas été volé');
        }
      },
      error => {
        console.error('Erreur système:', error);
      }
    );
  }
  // Methods to save or update the account
  /*saveCompte(): void {
    if (this.isEditMode) {
      // Update the existing account
    } else {
      // Save a new account
    }
  }*/

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComptesService } from '../comptes.service';
import { CompteCreateRequest } from '../model';

@Component({
  selector: 'app-comptes-detail',
  templateUrl: './comptes-detail.component.html',
  styleUrl: './comptes-detail.component.css'
})
export class ComptesDetailComponent implements OnInit{
  id: number | undefined;
  idUser: number | undefined;
  isEditMode: boolean = false;
/* <div>{{l.id}}</div>
              <div>{{l.description}}</div>
              <div>{{l.adressUrl}}</div>
              <div>{{l.email}}</div>
              <div>{{l.password}}</div>
              <div>{{l.userName}}</div>
              
              utilisateurId?:number;
        platformname?:string;
        description?:string;
        userName?:string;
        email?:string;
        adressUrl?:string;
        password?:string;*/
  compteForm!: FormGroup;
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
    private comptesService: ComptesService
  ) {}
  ngOnInit(): void {
    // Récupérer les IDs depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const idUserParam = params.get('idUser');

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
        this.initNewCompte();
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
  loadCompte(id: number): void {
    // Load the account using the ID
    console.log(`Loading compte with ID: ${id}`);
    // ... your logic to load the account
  }

  initNewCompte(): void {
    // Initialize a new account
    console.log('Initializing new compte');
    // ... your logic to initialize a new account
  }
  onSubmit(): void {
    if (this.compteForm.valid && this.idUser !== null) {
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
  }
  // Methods to save or update the account
  saveCompte(): void {
    if (this.isEditMode) {
      // Update the existing account
    } else {
      // Save a new account
    }
  }

}

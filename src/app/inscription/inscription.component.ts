import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurHttpService } from '../utilisateur/utilisateur-http.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  inscriptionForm!: FormGroup;
/*
    public  id?: number;
    public name?:string;
    public role?: string; // RoleEnum : USER / ADMIN
    public  dateBirth?: Date ;	
    public email?: string;
	public password?:string;
	public motPrimaire?: string;
	public   dateInscription?: Date;
*/
  nameCtrl!: FormControl;
  //roleCtrl!: FormControl;
  dateBirthCtrl!: FormControl;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  motPrimaireCtrl!: FormControl;

  constructor(private utilisateurHttpService: UtilisateurHttpService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    // const checkPasswords = (source: string, target: string) : ValidatorFn => {
    //   return (control: AbstractControl): ValidationErrors | null => {
    //     const sourceCtrl = control.get(source);
    //     const targetCtrl = control.get(target);
  /* nameCtrl!: FormControl;
       //roleCtrl!: FormControl;
  dateBirthCtrl!: FormControl;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  roleMotPrimaire!: FormControl; */
    //     return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
    //       ? { mismatch: true }
    //       : null;
    //   };
    // }

    this.nameCtrl = this.formBuilder.control("", Validators.required);
    //this.roleCtrl = this.formBuilder.control("", Validators.required);
    this.dateBirthCtrl = this.formBuilder.control("", Validators.required);
    this.emailCtrl = this.formBuilder.control("", Validators.required);
    this.passwordCtrl = this.formBuilder.control("", Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control("");
    this.motPrimaireCtrl = this.formBuilder.control("", Validators.required);

    this.inscriptionForm = this.formBuilder.group({
      name: this.nameCtrl,
      dateBirth: this.dateBirthCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
      motPrimaire: this.motPrimaireCtrl,
    }
  );

  }

  inscription() {
    this.utilisateurHttpService.inscription(this.inscriptionForm.value).subscribe(() =>
      this.router.navigate(['/login'])
    );
  }

  
}
export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
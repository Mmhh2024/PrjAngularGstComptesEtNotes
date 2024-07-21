import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserCreateRequest } from '../model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent  implements OnInit  {

  inscriptionForm!: FormGroup;
  nameCtrl!: FormControl;
  dateBirthCtrl!: FormControl;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  motPrimaireCtrl!: FormControl;
  userCreate: UserCreateRequest = {
    name: '',
    email: '',
    dateBirth: new Date(),
    password: '',
    motPrimaire: ''
  };
  errorMessage: string = '';


  constructor( private formBuilder: FormBuilder, 
              private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    
  this.nameCtrl = this.formBuilder.control("", Validators.required);
  this.dateBirthCtrl = this.formBuilder.control("", Validators.required);
  this.emailCtrl = this.formBuilder.control("", [Validators.required, Validators.email]);
  this.passwordCtrl = this.formBuilder.control("", [Validators.required, Validators.minLength(6)]);
  this.confirmPasswordCtrl = this.formBuilder.control("");
  this.motPrimaireCtrl = this.formBuilder.control("", Validators.required);

  this.inscriptionForm = this.formBuilder.group({
    name: this.nameCtrl,
    dateBirth: this.dateBirthCtrl,
    email: this.emailCtrl,
    password: this.passwordCtrl,
    confirmPassword: this.confirmPasswordCtrl,
    motPrimaire: this.motPrimaireCtrl,
  }, { validators: CustomValidators.MatchValidator('password', 'confirmPassword') });


  }

  inscription() {
   
    if (this.inscriptionForm.invalid) {
      return;
    }

    this.userCreate.name = this.nameCtrl.value;
    this.userCreate.email = this.emailCtrl.value;
    this.userCreate.dateBirth = new Date(this.dateBirthCtrl.value); // Conversion en date
    this.userCreate.password = this.passwordCtrl.value;
    this.userCreate.motPrimaire = this.motPrimaireCtrl.value;
    
      const encodedPassword = encodeURIComponent(this.passwordCtrl.value  );
    
      this.userCreate.password = encodedPassword;



    this.authService.register(this.userCreate).subscribe(
      (response: any) => {
        console.log("Registration successful");
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Registration error:', error);
        this.errorMessage = error;
        alert(error);
      }
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

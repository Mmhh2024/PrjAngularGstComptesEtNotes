import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ModifyNoteRequest, NoteCreateRequest, Notes } from '../model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrl: './notes-detail.component.css'
})
export class NotesDetailComponent implements OnInit{
  id: number | undefined;
  idUser: number | undefined;
  isEditMode: boolean = false;
  notes$!: Observable<Notes > ;
  message: string = "";

  noteForm!: FormGroup;
  idForm!:FormControl;
  idUtilisateurForm!: FormControl;
  /*      this.id = id;
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.contenu = contenu;
        this.description = description;*/
  nomCtrl!: FormControl;
 contenuCtrl!: FormControl;
 descriptionCtrl!: FormControl;
  
  
  noteCreate: NoteCreateRequest = {
                idUtilisateur: 0,
                nom: '',
                contenu: '',
                description:'',
              };
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notesService: NotesService
  ) {
    this.noteForm = this.formBuilder.group({
      id: [''],
      idUtilisateur: [''],
      nom: [''],
      contenu: [''],
      description: [''],
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
        this.loadNote(this.id);
       
      } else {
        this.id = undefined;
        this.isEditMode = false;
      
      }

      console.log(`User ID: ${this.idUser}, ID: ${this.id}, Edit Mode: ${this.isEditMode}`);
      this.nomCtrl = this.formBuilder.control('', Validators.required);
      this.descriptionCtrl = this.formBuilder.control('', Validators.required);
      this.contenuCtrl = this.formBuilder.control('',  Validators.required);

  
      this.noteForm = this.formBuilder.group({
        nom: this.nomCtrl,
        contenu: this.contenuCtrl,
        description: this.descriptionCtrl,
        
      });
    });
  }

  updateForm(note: Notes): void {
    this.noteForm.patchValue({
      id: note.id,
      nom: note.nom,
      description: note.description,
      contenu: note.contenu,
      idutilisateur: note.idUtilisateur
    });
  }
  loadNote(id: number): void {
 

      this.notesService.getNotesById(id).pipe(
        catchError((error: any) => {
          this.errorMessage = error;
          return of(null);
        })
      ).subscribe((note: Notes | null) => {
        if (note) {
          //this.comptes$ = compte;
          this.updateForm(note);
        }
      });

  }

 
  cancel(){
    this.router.navigate(['/notes']);
  }
  onSubmit(): void {
    if (this.noteForm.valid ) {
      //if ( this.isEditMode == false ) {
      if (!this.isEditMode) {
        const newNote: NoteCreateRequest = {
          idUtilisateur: this.idUser,
          nom: this.nomCtrl.value,
          description: this.descriptionCtrl.value,
          contenu: this.contenuCtrl.value,
        };

        this.notesService.createNote(newNote).subscribe(
          response => {
            console.log('Note created successfully:', response);
            this.router.navigate(['/notes']);
          },
          error => {
            console.error('Error creating compte:', error);
          }
        );
      }
    else{
     
      const note: ModifyNoteRequest = {
      id: this.id,
      idUtilisateur: this.idUser,
      nom: this.nomCtrl.value,
      description: this.descriptionCtrl.value,
      contenu: this.contenuCtrl.value,
      }
    
      
      this.notesService.modifyNote(note, this.id).subscribe(
        response => {
          console.log('Note mis à jour avec succès:', response);
          this.router.navigate(['/notes']);
        },
        error => {
          console.error('Erreur lors de la mise à jour de la note:', error);
          this.message = "Erreur lors de la mise à jour du compte";
        }
      );
      
      
    }
  } else{
    console.log("data non valide");
  }
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


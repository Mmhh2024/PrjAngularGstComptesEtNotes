import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComptesDetailComponent } from './comptes-detail/comptes-detail.component';
import { ComptesComponent } from './comptes/comptes.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { NotesDetailComponent } from './notes-detail/notes-detail.component';
import { NotesComponent } from './notes/notes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "login", component: LoginComponent},
  
  {path: "notes", component: NotesComponent},
  {path: "notes-detail/:idUser/:id",component:NotesDetailComponent},
  {path: "comptes", component: ComptesComponent},
  {path: "comptes-detail/:idUser/:id", component: ComptesDetailComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

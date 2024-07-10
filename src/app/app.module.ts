import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { TodoStatePipe } from './todo-state.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
//import { BooleanPipe } from './boolean.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ComptesDetailComponent } from './comptes-detail/comptes-detail.component';
import { ComptesComponent } from './comptes/comptes.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotesDetailComponent } from './notes-detail/notes-detail.component';
import { NotesComponent } from './notes/notes.component';
import { PasswordComponent } from './password/password.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    //TodoStatePipe,
    UtilisateurComponent,
    //BooleanPipe,
    NavBarComponent,
    LoginComponent,
    InscriptionComponent,
    SidebarComponent,
    PasswordComponent,
    NotesComponent,
    ComptesComponent,
    NotesDetailComponent,
    ComptesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

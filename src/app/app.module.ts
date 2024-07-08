import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoStatePipe } from './todo-state.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { BooleanPipe } from './boolean.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ListeComponent } from './liste/liste.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PasswordComponent } from './password/password.component';
import { NotesComponent } from './notes/notes.component';
import { ComptesComponent } from './comptes/comptes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    TodoDetailComponent,
    PageNotFoundComponent,
    TodoStatePipe,
    UtilisateurComponent,
    BooleanPipe,
    ListeComponent,
    NavBarComponent,
    LoginComponent,
    InscriptionComponent,
    SidebarComponent,
    PasswordComponent,
    NotesComponent,
    ComptesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

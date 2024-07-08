export class Todo {
    public id?: number;
    public title?: string;
    public completed?: boolean;
    public userId?: number;

    constructor(id?: number, title?: string, completed?: boolean,  userId?: number) {
        this.id = id;
        this.title = title;
        this.completed = completed ;
        this.userId = userId;
    }
}

/*export class Utilisateur {
    public id?: number;
    public nom?: string;
    public prenom?: string;
    public login?: string;
    public password?: string;
    public disabled?: boolean;

    constructor(id?: number, nom?: string, prenom?: string,  login?: string, password?: string, disabled?: boolean) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom ;
        this.login = login;
        this.password = password;
        this.disabled = disabled;
    }
}*/

export class Utilisateur {

    public  id?: number;
    public name?:string;
    public role?: string; // RoleEnum : USER / ADMIN
    public  dateBirth?: Date ;	
    public email?: string;
	public password?:string;
	public motPrimaire?: string;
	public   dateInscription?: Date;

    constructor(id?: number, name?: string, role?: string,  dateBirth?: Date, email?: string, password?: string, motPrimaire?: string,
    dateInscription?: Date
    ) {
        this.id = id;
        this.name = name;
        this.role = role ;
        this.dateBirth = dateBirth;
        this.email = email;
        this.password = password;
        this.motPrimaire = motPrimaire;
        this.dateInscription = dateInscription;
    }
}
    
export class Password{
    pwdclear?: string;
    constructor(pwd?:string){
        this.pwdclear = pwd;
    }
}
export class Liste {
    id?: number;
    nom?: string;
    todos: Array<Todo> = new Array<Todo>();

    constructor(id?: number, nom?: string) {
        this.id = id;
        this.nom = nom;
    }
}
export class Notes {

    id?: number;
    idUtilisateur?:number;
    nom?:string;
    contenu?:string;
    description?:string;
    dateAjout?:Date;
    dateModification?:Date;
    constructor(id?:number, idUtilisateur?:number, nom?:string, contenu?:string, description?:string,
                dateAjout?:Date, dateModification?:Date ){
        this.id = id;
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.contenu = contenu;
        this.description = description;
        this.dateAjout = dateAjout;
        this.dateModification = dateModification;
    }
}
export class Comptes {
        id?: number;
        //idUtilisateur?:number;
        platformname?:string;
        description?:string;
        dateAdded?:Date;
        dateUpdate?:Date;
        userName?:string;
        email?:string;
        adressUrl?:string;
        password?:string;
        //utilisateur_id?:number;
        constructor(id?:number, platformname?:string, description?:string,
                    dateAdded?:Date,dateUpdate?:Date,userName?:string,
                    email?:string, adressUrl?:string,password?:string,utilisateur_id?:number){
          this.id = id;
          this.description = description;
          this.platformname = platformname;
          this.email = email;
          this.dateAdded = dateAdded;
          this.dateUpdate = dateUpdate;
          this.userName = userName;
          //this.utilisateur_id = utilisateur_id;
          this.email = email;
          //this.utilisateur_id = utilisateur_id;
        }
    }

export class ComptesUserRequest{
    idUtilisateur?:number;
    constructor(idUtilisateur?:number){
        this.idUtilisateur = idUtilisateur; 
    }

}
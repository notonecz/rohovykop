import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";
import {EditClenDialogComponent} from './admin/edit-clen-dialog/edit-clen-dialog.component';
import {Dialog} from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient)

  // API LINKS

  public isLoading = signal(false)
  public error : WritableSignal<any> = signal(null)
  logging = true;

  public clanky! : Clanek[]
  public user? : User
  public ucty! : User[]
  dialog = inject(Dialog)

  private urlLogin = '/api/session/login';
  private urlLogout = '/api/session/logout';
  private urlSession = '/api/session/get';
  private urlClanekNew = '/api/clanek/create';
  private urlClanekEdit = '/api/clanek/edit';
  private urlClanekDelete = '/api/clanek/delete';
  private urlClanekVerejne = '/api/clanek/verejne';
  private urlClanekGet = '/api/clanek/get';
  private urlClanekGetAll = '/api/clanek/get/all';
  private urlClanekGetObrazek = '/api/clanek/get/obrazek';
  private urlUser = '/api/profile/get';
  private urlUserDelete = '/api/uzivatele/delete';
  private urlUserCreate = '/api/uzivatele/create';
  private urlUserUpgrade  = '/api/uzivatele/upgrade';
  private urlUserDowngrade = '/api/uzivatele/downgrade';
  private urlUserEdit = '/api/uzivatele/edit';
  private urlUserAll = '/api/uzivatele/get';
  private urlSettingsGet = '/api/settings/get';
  private urlSettingsPost = '/api/settings/edit';
  private urlONas = '/api/web/onas';

  async _get<T>(url: string, params?: any): Promise<T> {
    try {
      this.isLoading.set(true);
      return await firstValueFrom(this.http.get<T>(url, {params}).pipe(
        timeout(10000),
        catchError((err) => {
          this.error.set(err);
          return throwError(() => err);
        })
      ));
    } finally {
      this.isLoading.set(false);
      if (this.logging) {
        console.log(url);
      }
    }
  }

  async _post<T>(url: string, params?: any): Promise<T> {
    try {
      this.isLoading.set(true);
      return await firstValueFrom(this.http.post<T>(url, params).pipe(
        timeout(10000),
        catchError((err) => {
          this.error.set(err);
          return throwError(() => err);
        })
      ));
    } finally {
      this.isLoading.set(false);
      if (this.logging) {
        console.log(url);
      }
    }
  }


  public async get_session() {
    return await this._get<ISesData>(this.urlSession);
  }

  public async get_onas() {
    return await this._get<{value: string}>(this.urlONas);
  }

  public async get_user(): Promise<User> {
    return await this._get<User>(this.urlUser);
  }

  public async get_user_all(): Promise<User[]> {
    return await this._get<User[]>(this.urlUserAll);
  }

  public async get_clanky(typ : number): Promise<Clanek[]> {
    return await this._get<Clanek[]>(this.urlClanekGet, {type: typ});
  }

  public async get_clankyall(typ : number) {
    this.clanky = await this._get<Clanek[]>(this.urlClanekGetAll, {type: typ});
  }

  public async get_clanek_obrazek(id : number): Promise<Clanek> {
    return await this._get<Clanek>(this.urlClanekGetObrazek, {id: id});
  }

  public async get_settings(): Promise<Settings> {
    return await this._get<Settings>(this.urlSettingsGet);
  }

  // POST

  public async post_login(data: any): Promise<ISesData> {
    return await this._post<any>(this.urlLogin, data);
  }

  public async post_upgrade_user(id : number) {
    return await this._post<any>(this.urlUserUpgrade, {id : id});
  }

  public async post_downgrade_user(id : number) {
    return await this._post<any>(this.urlUserDowngrade, {id : id});
  }

  public async post_add_user(data: any): Promise<ISesData> {
    return await this._post<any>(this.urlUserCreate, data);
  }

  public async post_edit_user(data: any): Promise<ISesData> {
    return await this._post<any>(this.urlUserEdit, data);
  }

  public async post_delete_user(id: number): Promise<ISesData> {
    return await this._post<any>(this.urlUserDelete, {id : id});
  }

  public async post_logout(): Promise<ISesData> {
    return await this._post<any>(this.urlLogout, {});
  }

  public async post_clanek_create(data : any): Promise<Clanek> {
    return await this._post<Clanek>(this.urlClanekNew, data);
  }

  public async post_clanek_edit(data : any): Promise<Clanek> {
    return await this._post<Clanek>(this.urlClanekEdit, data);
  }

  public async post_clanek_delete(id : number): Promise<Clanek> {
    return await this._post<Clanek>(this.urlClanekDelete, {id : id});
  }

  public async post_clanek_verejne(verejne : boolean, id : number): Promise<Clanek> {
    return await this._post<Clanek>(this.urlClanekVerejne, {verejne : verejne, id : id});
  }

  public async post_settings(data : any): Promise<Settings> {
    return await this._post<Settings>(this.urlSettingsPost, data);
  }

  async addClen() {
    const dia = this.dialog.open(EditClenDialogComponent, {data: {create: true}});
    dia.closed.subscribe(async (result: any) => {
      if (result) {
        await this.post_add_user(result)
        await this.loadUcty()
      }
    });
  }

  async loadUcty(){
    this.ucty = await this.get_user_all()
    this.user = await this.get_user()
  }

  async loadClanky(typ : number) {
    await this.get_clankyall(typ)
  }

  editClen(
    id: number | undefined,
    username: string | undefined,
    email: string | undefined,
    name_first: string | undefined,
    name_last: string | undefined,
  ): void {
    const dia = this.dialog.open(EditClenDialogComponent, {
      data: {username: username, email: email, name_first: name_first, name_last: name_last, id: id},
    });
    dia.closed.subscribe(async (result: any) => {
      if (result) {
        this.isLoading.set(true);
        await this.post_edit_user(result)
        await this.loadUcty()
      }
    });
  }


  nav : NavItem[] = [
    {name:'Články',link:'clanky', icon: "text_snippet", button: "Vytovřit nový článek", buttonFunc: 0},
    {name:'Rozhovory',link:'rozhovory', icon: "headset_mic", button: "Vytvořit nový rozhovor", buttonFunc: 1},
    {name:'Nastavení',link:'nastaveni', icon: "settings", adminonly: true},
    {name:'Zajímavosti',link:'zajimavosti', icon: "tips_and_updates", button: "Vytvořit novou zajímavost nebo spekulaci", buttonFunc: 2},
    {name:'Přestupy',link:'prestupy', icon: "double_arrow", button: "Vytvořit nový přestup",buttonFunc: 3},
    {name:'Účty',link:'ucty', icon: "group", uctyButton: true},
  ]

}

export interface ISesData {
  user : string
}
export interface User {
  id: number;
  username : string
  email : string
  name_first : string
  root_admin : number
  name_last : string
}

export interface Clanek {
  id : number
  nazev : string
  text : string
  type : number
  verejne : boolean
  date : Date
  image : string
  edges: {
    autor: User
  }
}


export interface NavItem {
  name: string;
  link: string;
  icon: string;
  adminonly?: boolean;
  button?: string;
  buttonFunc?: number;
  uctyButton?: boolean;
}

export interface Settings {
  logo: string,
  baner: string,
  icon: string,
  onas: string
}

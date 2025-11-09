import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SessionService} from '../session.service';
import {ApiService, NavItem} from '../api.service';
import {filter} from 'rxjs';
import {Dialog} from '@angular/cdk/dialog';
import {NewClanekDialogComponent} from './new-clanek-dialog/new-clanek-dialog.component';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-admin',
  imports: [
    NavbarComponent,
    RouterOutlet,
    LoginComponent,
    MatProgressBar
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  session = inject(SessionService);
  dialog = inject(Dialog);
  api = inject(ApiService);
  router = inject(Router);
  name : NavItem | undefined;

  async ngOnInit() {
    await this.api.loadUcty()
    this.name = this.setName()
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.name = this.setName()
        this.api.loadUcty()
      });
  }

  setName() {
    const segments = this.router.url.split('/').filter(segment => segment);
    if (segments.length < 2) {
      return {name: "Nenalezeno", link: "", icon: ""};
    }

    const [,categoryLink] = segments;

    const category = this.api.nav?.find(cat => cat.link === categoryLink);
    if (!category) {
      return {name: "Nenalezeno", link: "", icon: ""};
    }

    return category;
  }

  openDialog(typ: number, title: string | undefined) {
    console.log(typ);
    const dia = this.dialog.open(NewClanekDialogComponent, {
      data: {typ: typ, title: title, action: true},
    });
    dia.closed.subscribe(async result => {
      await this.api.loadClanky(typ)
    });
  }
}

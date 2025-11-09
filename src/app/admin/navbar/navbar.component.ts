import {Component, inject, Injectable} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {SessionService} from '../../session.service';
import {ApiService} from '../../api.service';
import {MatMenuModule} from '@angular/material/menu';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  session = inject(SessionService);
  api = inject(ApiService);

}

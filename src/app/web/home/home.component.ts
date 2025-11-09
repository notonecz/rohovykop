import { Component } from '@angular/core';
import {ClanekComponent} from '../clanky/clanek/clanek.component';

@Component({
  selector: 'app-home',
  imports: [
    ClanekComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

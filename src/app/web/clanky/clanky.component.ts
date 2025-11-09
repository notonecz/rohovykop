import {Component, inject, Input, OnInit} from '@angular/core';
import {ClanekBoxComponent} from './clanek-box/clanek-box.component';
import {ApiService, Clanek} from '../../api.service';

@Component({
  selector: 'app-clanky',
  imports: [
    ClanekBoxComponent
  ],
  templateUrl: './clanky.component.html',
  styleUrl: './clanky.component.css'
})
export class ClankyComponent implements OnInit {

  @Input() nazev : string = "Články";
  @Input() typ : number = 0;

  api = inject(ApiService)

  clanky? : Clanek[]

  async ngOnInit() {
    if (this.typ) {
      this.clanky = await this.api.get_clanky(this.typ.valueOf())
    } else {
      this.clanky = await this.api.get_clanky(0)
    }
    if (this.clanky) {
      this.clanky.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }
}


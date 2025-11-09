import {ChangeDetectorRef, Component, inject, Injectable, Input, OnInit} from '@angular/core';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListSubheaderCssMatStyler
} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {ApiService} from '../../api.service';
import {NewClanekDialogComponent} from '../new-clanek-dialog/new-clanek-dialog.component';
import {Dialog} from '@angular/cdk/dialog';
import {MatLine} from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-clanky',
  standalone: true,
  imports: [
    MatList,
    MatListItemIcon,
    MatIcon,
    MatListItem,
    MatListSubheaderCssMatStyler,
    MatLine
  ],
  templateUrl: './clanky.component.html',
  styleUrl: './clanky.component.css'
})
export class ClankyComponent implements OnInit {

  @Input() typ : number = 0;

  api = inject(ApiService);
  dialog = inject(Dialog);

  async ngOnInit() {
    await this.api.loadClanky(this.typ)
  }

  openDialog(type: number | undefined, nazev: string, text: string, image: string, id: number | null, title: string): void {
    const dia = this.dialog.open(NewClanekDialogComponent, {
      data: {type: type, nazev: nazev, text: text, image: image, id: id, title: title,},
    });
    dia.closed.subscribe(async result => {
      await this.api.loadClanky(this.typ)
    });
  }

  async removeClanek(id: number) {
    await this.api.post_clanek_delete(id)
    await this.api.loadClanky(this.typ)
  }

  async verejneClanek(id: number, verejne : boolean) {
    await this.api.post_clanek_verejne(verejne, id)
    await this.api.loadClanky(this.typ)
  }
}

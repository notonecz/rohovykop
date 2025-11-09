import {Component, inject, Injectable, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem, MatListItemIcon, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {ApiService, User} from '../../api.service';
import {Dialog} from '@angular/cdk/dialog';
import {NewClanekDialogComponent} from '../new-clanek-dialog/new-clanek-dialog.component';
import {EditClenDialogComponent} from '../edit-clen-dialog/edit-clen-dialog.component';
import {WarnSuperadminComponent} from '../warn-superadmin/warn-superadmin.component';

@Component({
  selector: 'app-ucty',
    imports: [
        MatIcon,
        MatLine,
        MatList,
        MatListItem,
        MatListItemIcon,
        MatListSubheaderCssMatStyler
    ],
  templateUrl: './ucty.component.html',
  styleUrl: './ucty.component.css'
})
export class UctyComponent  {

  api = inject(ApiService);
  dialog = inject(Dialog);

  upgradeClenSuper(id : number): void {
    const dia = this.dialog.open(WarnSuperadminComponent, {
      data: {souhlas: true},
    });
    dia.closed.subscribe(async result => {
      if (result) {
        await this.upgradeUser(id)
      }
    });
  }

  async upgradeUser(id: number) {
    await this.api.post_upgrade_user(id);
    await this.api.loadUcty()
  }

  async downgradeUser(id: number) {
    await this.api.post_downgrade_user(id);
    await this.api.loadUcty()
  }

  async removeClen(id: number) {
    await this.api.post_delete_user(id)
    await this.api.loadUcty()
  }

}

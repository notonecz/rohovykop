import { Routes } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {UctyComponent} from './admin/ucty/ucty.component';
import {ClankyComponent as ClankyAdmin} from './admin/clanky/clanky.component';
import {ClankyComponent as ClankyWeb} from './web/clanky/clanky.component';
import { PrestupyComponent as AdminPrestupyComponent} from './admin/prestupy/prestupy.component';
import { PrestupyComponent as WebPrestupyComponent} from './web/prestupy/prestupy.component';
import {RozhovoryComponent} from './admin/rozhovory/rozhovory.component';
import { OnasComponent as AdminOnasComponent } from './admin/onas/onas.component';
import { OnasComponent as WebOnasComponent } from './web/onas/onas.component';
import {ZajimavostiComponent} from './admin/zajimavosti/zajimavosti.component';
import {WebComponent} from './web/web.component';
import {HomeComponent} from './web/home/home.component';
import {ZajimavostiWebComponent} from './web/zajimavosti-web/zajimavosti-web.component';
import {RozhovoryWebComponent} from './web/rozhovory-web/rozhovory-web.component';

const name = " | Rohový Kop"

export const routes: Routes = [
  {component: AdminComponent, title: "Admin" + name, path: "admin", children: [
      {path: '', pathMatch: 'full', redirectTo: 'clanky'},
      {component: UctyComponent, path: "ucty"},
      {component: ClankyAdmin, path: "clanky"},
      {component: AdminPrestupyComponent, path: "prestupy"},
      {component: RozhovoryComponent, path: "rozhovory"},
      {component: AdminOnasComponent, path: "nastaveni"},
      {component: ZajimavostiComponent, path: "zajimavosti"},
      {path: '**', pathMatch: 'prefix', redirectTo: 'clanky'},
    ]},
  {component: WebComponent, title: "Rohový kop", path: '', children: [
    {path: 'home', component: HomeComponent},
    {path: 'o-nas', component: WebOnasComponent},
    {path: 'clanky', component: ClankyWeb},
    {path: 'prestupy', component: WebPrestupyComponent},
    {path: 'zajimavosti', component: ZajimavostiWebComponent},
    {path: 'rozhovory', component: RozhovoryWebComponent},
    {path: 'clanek', component: RozhovoryWebComponent, children: [
      {path: ':clanekID', component: RozhovoryWebComponent},
      ]},
    {path: '', pathMatch: "full", redirectTo: 'home'},
    ]},
  {path: '**', redirectTo: 'home'},
];

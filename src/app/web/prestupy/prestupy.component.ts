import { Component } from '@angular/core';
import {ClankyComponent} from '../clanky/clanky.component';

@Component({
  selector: 'app-prestupy',
  imports: [
    ClankyComponent
  ],
  templateUrl: './prestupy.component.html',
  styleUrl: './prestupy.component.css',
  host: {
    '[attr.data-id]': "122"
  }
})
export class PrestupyComponent {

}

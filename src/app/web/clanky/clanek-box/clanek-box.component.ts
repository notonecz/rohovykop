import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-clanek-box',
  imports: [
    RouterLink
  ],
  templateUrl: './clanek-box.component.html',
  styleUrl: './clanek-box.component.css'
})
export class ClanekBoxComponent {

  @Input() nazev: string | undefined;
  @Input() image: string | undefined;
  @Input() date?: Date = new Date();
  @Input() link: string | undefined;

  redoDate(date: Date | undefined) {
    date = new Date();
    return  date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear() ;
  }

}

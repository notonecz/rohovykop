import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavComponent} from './nav/nav.component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-web',
  imports: [
    RouterOutlet,
    NavComponent,
    MatProgressBar
  ],
  templateUrl: './web.component.html',
  styleUrl: './web.component.css'
})
export class WebComponent {

  api = inject(ApiService);

}

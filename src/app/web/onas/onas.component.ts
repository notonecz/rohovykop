import {Component, inject, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-onas',
  imports: [],
  templateUrl: './onas.component.html',
  styleUrl: './onas.component.css'
})
export class OnasComponent implements OnInit {

  text : { value: string; } | undefined;
  api = inject(ApiService);

  async ngOnInit() {
    this.text = await this.api.get_onas();
  }

}

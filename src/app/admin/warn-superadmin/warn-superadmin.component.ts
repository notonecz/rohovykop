import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
@Component({
  selector: 'app-warn-superadmin',
  imports: [
    FormsModule,
  ],
  templateUrl: './warn-superadmin.component.html',
  styleUrl: '../../dialog.css'
})
export class WarnSuperadminComponent {

  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);

}

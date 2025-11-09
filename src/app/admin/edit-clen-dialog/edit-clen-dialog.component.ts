import {Component, inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-clen-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-clen-dialog.component.html',
  styleUrl: '../../dialog.css'
})
export class EditClenDialogComponent implements OnInit {

  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);
  fb = inject(FormBuilder);
  title = 'Upravit uživatele';

  ngOnInit() {
    if (this.data.create) {
      this.form.patchValue({ id: 0 });
      this.title = 'Vytvořit uživatele';
    }
  }

  form = this.fb.nonNullable.group({
    id: [this.data.id, Validators.required],
    username: [this.data.username, Validators.required],
    email: [this.data.email, [Validators.required, Validators.email]],
    name_first: [this.data.name_first, Validators.required],
    name_last : [this.data.name_last, Validators.required],
    password : [""],
  })

  save(form: any) {
    const result = form.getRawValue();
    this.dialogRef.close(result);
  }

}

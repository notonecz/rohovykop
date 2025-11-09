import {Component, inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService, Clanek} from '../../api.service';

@Component({
  selector: 'app-new-clanek-dialog',
  imports: [
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './new-clanek-dialog.component.html',
  styleUrl: '../../dialog.css'
})
export class NewClanekDialogComponent implements OnInit {

  fileName = '';
  reader = new FileReader();
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);
  api = inject(ApiService);
  fb = inject(FormBuilder);

  create = this.data.action;

  form = this.fb.nonNullable.group({
    nazev: [this.data.nazev, Validators.required],
    text: [this.data.text],
    image: [this.data.image],
    type: [this.data.typ, Validators.required],
    id : [this.data.id],
  })

  image : Clanek | undefined;

  async ngOnInit() {
    if (!this.create) {
      this.image = await this.api.get_clanek_obrazek(this.data.id)
      this.form.patchValue({ image: this.image.image });
    }
  }

  onFileUpload(event: MouseEvent, fileUpload: HTMLInputElement): void {
    event.stopPropagation();
    this.fileName = fileUpload.name;
    fileUpload.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file && file.type === 'image/jpeg' || file.type === 'image/png') {
      this.fileName = file.name;

      this.reader.readAsDataURL(file);

      this.reader.onload = () => {
        this.form.patchValue({ image: this.reader.result });
      };


      this.reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  async save(data : any) {
    if (this.create) {
      await this.api.post_clanek_create(data)
      this.dialogRef.close();
    } else {
      await this.api.post_clanek_edit(data)
      this.dialogRef.close();
    }
  }

}

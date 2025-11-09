import {Component, computed, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../../api.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {from} from 'rxjs';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-onas',
  imports: [
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './onas.component.html',
  styleUrl: './onas.component.scss'
})
export class OnasComponent {

  fb = inject(FormBuilder)
  api = inject(ApiService)

  data = toSignal(from( this.api.get_settings()), {initialValue: null});

  form = computed(() => {
    const d = this.data()
    return this.fb.group({
      onas : [d?.onas],
      baner : [d?.baner],
      icon : [d?.icon],
      logo : [d?.logo],
    })
  })

  async submit() {
    await this.api.post_settings(this.form().getRawValue())
  }

  onFileChange(event: Event, type : string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        switch(type) {
          case 'baner':
            this.form().controls.baner.setValue(base64String);
            break;
          case 'icon':
            const img = new Image();
            img.onload = () => {
              if (img.width <= 64 && img.height <= 64) {
                this.form().controls.icon.setValue(base64String);
              } else {
                alert('Prosíme, nahrajte ikonu o velikosti 64 x 64 nebo menší!');
              }
            };
            img.src = base64String;
            break
          case 'logo':
            this.form().controls.logo.setValue(base64String);
            break;
          default:
            break;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  onFileUpload(event: MouseEvent, fileUpload: HTMLInputElement): void {
    event.stopPropagation();
    fileUpload.click();
  }

}

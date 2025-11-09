import {Component, inject, signal} from '@angular/core';
import {MatFormField, MatSuffix, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {SessionService} from '../../session.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatIcon,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIconButton,
    ReactiveFormsModule,
    NgIf,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  chyba = false

  ses = inject(SessionService);
  fb = inject(FormBuilder)
  hide = signal(true);
  form = this.fb.nonNullable.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  })

  async login() {
    if (this.form.valid) {
      await this.ses.login(this.form.getRawValue())
      if (this.ses.data()?.user === "") {
        this.form.setErrors({ invalidLogin: true });
        this.chyba = true
      }
    }
  }
}

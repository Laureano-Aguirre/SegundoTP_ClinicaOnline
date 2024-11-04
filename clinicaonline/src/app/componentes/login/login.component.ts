import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  rutaBienvenida: string = 'bienvenida';
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  private initializeForm() {
    this.form = this.fb.group({});
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

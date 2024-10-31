import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { validatePassword } from '@firebase/auth';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
})
export class RegistrarseComponent {
  form: FormGroup;
  imageError1: string | null = null;
  imageError2: string | null = null;
  image1: File | null = null;
  image2: File | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(15)]],
      dni: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(8)],
      ],
      obraSocial: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, validatePassword]],
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get edad() {
    return this.form.get('edad');
  }
  get dni() {
    return this.form.get('dni');
  }
  get obraSocial() {
    return this.form.get('obraSocial');
  }
  get email() {
    return this.form.get('email');
  }
  get clave() {
    return this.form.get('clave');
  }

  onFileSelect(event: Event, imageType: 'image1' | 'image2') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Verificar el tipo y tamaño de archivo
      if (!file.type.startsWith('image/')) {
        this.setError(imageType, 'Solo se permiten archivos de imagen');
      } else if (file.size > 2 * 1024 * 1024) {
        this.setError(imageType, 'El archivo debe ser menor a 2 MB');
      } else {
        this.clearError(imageType);
        if (imageType === 'image1') {
          this.image1 = file;
        } else {
          this.image2 = file;
        }
      }
    }
  }

  setError(imageType: 'image1' | 'image2', errorMessage: string) {
    if (imageType === 'image1') {
      this.imageError1 = errorMessage;
    } else {
      this.imageError2 = errorMessage;
    }
  }

  clearError(imageType: 'image1' | 'image2') {
    if (imageType === 'image1') {
      this.imageError1 = null;
    } else {
      this.imageError2 = null;
    }
  }

  onSubmit() {
    if (this.form.valid && this.image1 && this.image2) {
      // Lógica para manejar el formulario, incluyendo las imágenes cargadas
      console.log('Formulario válido:', this.form.value);
      console.log('Imagen 1:', this.image1);
      console.log('Imagen 2:', this.image2);
    } else {
      console.log('Formulario inválido o falta cargar las imágenes');
    }
  }
}

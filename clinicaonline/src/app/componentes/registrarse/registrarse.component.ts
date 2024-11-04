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
import { Router } from '@angular/router';

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
  form!: FormGroup;
  imageError1: string | null = null;
  imageError2: string | null = null;
  image1: File | null = null;
  image2: File | null = null;
  rutaBienvenida: string = 'bienvenida';
  selectedRol: 'especialista' | 'paciente' | null = null;
  especialidades = [
    'Cardiología',
    'Dermatología',
    'Ginecología',
    'Oftalmología',
    'Pediatría',
    'Psiquiatría',
    'Traumatología',
    'Otro',
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.initializeForm();
  }

  private initializeForm() {
    const commonFields = {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(15)]],
      dni: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(8)],
      ],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    };
    if (this.selectedRol === 'paciente') {
      this.form = this.fb.group({
        ...commonFields,
        obraSocial: ['', [Validators.required, Validators.minLength(2)]],
      });
    } else {
      this.form = this.fb.group({
        ...commonFields,
        especialidad: ['', [Validators.required]],
      });
    }
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

  get especialidad() {
    return this.form.get('especialidad');
  }

  selectRol(role: 'especialista' | 'paciente') {
    this.selectedRol = role;
    this.initializeForm();
  }

  onFileSelect(event: Event, imageType: 'image1' | 'image2') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
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
    if (this.form.valid) {
      const requiredImages = this.selectedRol === 'paciente' ? 2 : 1;
      const imagesValid =
        this.selectedRol === 'paciente'
          ? this.image1 && this.image2
          : this.image1;

      if (imagesValid) {
        console.log('Formulario válido:', this.form.value);
        console.log('Imagen 1:', this.image1);
        if (this.selectedRol === 'paciente') {
          console.log('Imagen 2:', this.image2);
        }
      } else {
        console.log(`Faltan cargar ${requiredImages} imagen(es)`);
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

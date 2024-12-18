import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css',
})
export class BienvenidaComponent {
  rutaLogin: string = 'login';
  rutaRegistrarse: string = 'registrarse';
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}

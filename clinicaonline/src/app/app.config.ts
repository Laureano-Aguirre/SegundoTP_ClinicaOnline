import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"clinicaonline-63516","appId":"1:50887528826:web:ee8d2455f59053ff79c6c3","storageBucket":"clinicaonline-63516.appspot.com","apiKey":"AIzaSyDw6pwNEidp5SjK59ILrOpaWKtxB0wVUEw","authDomain":"clinicaonline-63516.firebaseapp.com","messagingSenderId":"50887528826"})), provideAuth(() => getAuth())]
};

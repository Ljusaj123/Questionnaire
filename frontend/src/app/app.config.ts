import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { definePreset } from '@primeng/themes';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

const primaryShades = {
  50:  '#e6f0ff',
  100: '#c2d9ff',
  200: '#99bfff',
  300: '#669fff',
  400: '#337dff',
  500: '#1a5fd1',
  600: '#154ea8',
  700: '#103d80',
  800: '#0b2c59',
  900: '#071c33',
  950: '#040f1a',
};

const ZeloPreset = definePreset(Aura, {
  semantic: {
    primary: primaryShades,
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: ZeloPreset,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
  ],
};

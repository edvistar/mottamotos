import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient, withFetch, withInterceptors  } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    importProvidersFrom(MatSnackBarModule,MatProgressBarModule, MatProgressSpinnerModule),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor]) ),
    provideAnimations()
  ]
};

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const scheme = window.matchMedia('(prefers-color-scheme: dark)');
const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
  document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
};

applyTheme(scheme);
scheme.addEventListener('change', applyTheme);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

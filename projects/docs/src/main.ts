import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import DocsLayoutComponent from './app/core/layout/docs-layout.component';
import { routes } from './app/app.routes';
bootstrapApplication(DocsLayoutComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));

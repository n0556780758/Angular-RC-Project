// / <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';

// bootstrapApplication(AppModule)
//   .catch((err) => console.error(err));
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// const config: any = appConfig;

  // platformBrowserDynamic().bootstrapModule(AppModule, config)
  // .catch((err) => console.error(err));
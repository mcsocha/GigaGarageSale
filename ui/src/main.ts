import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';

type WindowExtended = Window & typeof globalThis & {
  ngRef: ApplicationRef;
}

bootstrapApplication(AppComponent, appConfig)
  .then((ref: ApplicationRef) => ensureDestroyOnHotReload(ref))
  .catch((err) => console.error(err));

function ensureDestroyOnHotReload(ref: ApplicationRef): void {
  let { ngRef } = window as WindowExtended
  if (ngRef) {
    ngRef.destroy();
    console.log('ngRef destroyed');
  }
  ngRef = ref
}

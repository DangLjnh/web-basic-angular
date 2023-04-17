import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// const fruits = [1, 2, 3, 2];
// function checKString(name: any) {
//   return typeof name === 'string';
// }
// console.log(fruits.some(checKString));

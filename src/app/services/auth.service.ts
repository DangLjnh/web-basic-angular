import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get currentUser() {
    // return of(false);
    return of({
      username: 'Linh',
      posts: ['title-1', 'title-2', 'title-3', 'title-4'],
    });
  }
  constructor() {}
}

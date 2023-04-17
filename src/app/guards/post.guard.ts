import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { CheckDeactivate } from '../models/CheckDeactivate';

@Injectable({
  providedIn: 'root',
})
export class PostGuard
  implements CanActivate, CanActivateChild, CanDeactivate<CheckDeactivate>
{
  constructor(private authService: AuthService) {}
  canDeactivate(
    component: CheckDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot | undefined
  ): Observable<boolean> {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
  canActivate(
    route: ActivatedRouteSnapshot, // contains destination information
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // must be login
    return this.authService.currentUser.pipe(map((user) => !!user));
    // return of(true);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, // contains destination information
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // must be have a slug
    // const targetSlug = childRoute.params?.['slug'];
    // if (!targetSlug) return of(false);

    // return this.authService.currentUser.pipe(
    //   map((user) => user.posts.includes(targetSlug))
    // );
    return of(true);
  }
}

import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('canActivateChild');
    const user = this.userService.getUser();

    if (!user) {
      console.log(`Not logged in! Redirecting`);
      this.router.navigate(['login']);
      return false;
    }

    if (state.url.startsWith('/app/admin') && !user?.admin) {
      console.log(`Logged in, but not admin! Redirecting`);
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}

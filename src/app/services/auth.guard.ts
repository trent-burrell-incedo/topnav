import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.authService.getToken();
      const isLoginPage = state.url === '/login';
      if (token) {
        return this.authService.validateToken().pipe(
          tap(data => {
            if (!data) {
              console.log('Token validation failed, redirecting to login');
              this.authService.logout();
              this.router.navigate(['/login']);
            } else {
              console.log('Token validation succesful');
              if (isLoginPage) {
                this.router.navigate(['']);
              } else {
                return true;
              }
            }
          })
        );
      } else {
        if (isLoginPage) {
          return true;
        } else {
          console.log('No token, redirecting to login');
          this.router.navigate(['/login']);
          return false;
        }
      }
  }
  
}

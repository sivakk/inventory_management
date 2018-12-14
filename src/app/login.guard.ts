import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _employee: EmployeeService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this._employee.isLogged().pipe(map(res => {
      if (res === true) {
        this._employee.setLoggedIn(true);
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }
}

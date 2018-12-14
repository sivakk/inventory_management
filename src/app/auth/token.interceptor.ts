import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { LoginService } from '../login.service';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: LoginService, private router: Router) {
  }


  /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const loggedInUser = this.auth.getLoggedInUserData();
    const token = loggedInUser.token;
    if (loggedInUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + token
        }
      });
    } else {
      this.router.navigate(['/login']);
    }

    /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
        // intercept the respons error and displace it to the console
        console.log('got error in interceptor', error);
        this.handleAuthError(error);
        return of(error);
      }) as any);
  }


  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401) {
      console.log('handled 401 error ' + err.status);
      this.router.navigate([`/login`]);
      // if you've caught / handled the error, you don't want to rethrow it unless
      // you also want downstream consumers to have to handle it as well.
      return of(err.message);
    } else if (err.status === 403) {
        console.log('handled 403 error ' + err.status);
        this.router.navigate([`/login`]);
      // if you've caught / handled the error, you don't want to rethrow it unless
      // you also want downstream consumers to have to handle it as well.
        return of(err.message);
      }
    throw Error;
  }
}

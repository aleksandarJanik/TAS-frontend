import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  from,
  Observable,
  ObservableInput,
  of,
  throwError,
} from 'rxjs';
import { StorageService } from '../services/storage.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    public storageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepted', request.url);
    const getAccessTokenObs = from(this.storageService.getAccessToken());

    return getAccessTokenObs.pipe(
      switchMap((accessToken) => {
        console.log('pipe accessToken', accessToken);
        if (accessToken) {
          request = this.addToken(request, accessToken);
        }
        return next.handle(request).pipe(
          catchError((error) => {
            console.log('Error making request with access token.');
            if (
              error instanceof HttpErrorResponse &&
              error.status === 401 &&
              !request.url.includes('refreshtoken')
            ) {
              return this.handle401error(request, next);
            } else {
              return throwError(error);
            }
          })
        );
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401error(request: HttpRequest<any>, next: HttpHandler) {
    console.log('handle401error');
    if (!this.isRefreshing) {
      console.log('handle401error if');
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const observable = from(this.authService.refreshToken());
      console.log('calling refreshToken from observable');
      return observable.pipe(
        switchMap((token) => {
          console.log('handle401error got new token', token);
          this.isRefreshing = false;
          let accessToken = '';
          if (token !== null) {
            this.refreshTokenSubject.next(token.accessToken);
            accessToken = token.accessToken;
          }

          return next.handle(this.addToken(request, accessToken)).pipe(
            catchError((error) => {
              console.log(
                'Error making request with refreshed token from if',
                error
              );
              this.isRefreshing = false;
              this.refreshTokenSubject.next(null);
              return throwError(error);
            })
          );
        }),
        catchError((error) => {
          // handle e and return a safe value or re-throw
          console.log('Error refreshing the token', error);
          // this.authService.logout(true);
          return throwError(error);
          // throwError(error);
        })
      );
    } else {
      console.log('handle401error else');
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) =>
          next.handle(this.addToken(request, jwt)).pipe(
            catchError((error) => {
              console.log(
                'Error making request with refreshed token from else',
                error
              );
              return throwError(error);
            })
          )
        ),
        catchError((error) => {
          console.log('Error refreshTokenSupject pipe', error);
          return throwError(error);
        })
      );
    }
  }
}

import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {StorageService} from '../services/storage.service';



@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  /**
   * Handle errors
   */
  static handleError(err: HttpErrorResponse, request?: HttpRequest<any>, next?: HttpHandler): Observable<HttpErrorResponse> {
    throw err;
  }

  constructor(private storageService: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error, caught) => {
          RequestInterceptor.handleError(error, request, next);
          return of(error);
        }) as any);
  }


}

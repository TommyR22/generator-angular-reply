import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient) {
  }

  /**
   * getJalopnikNews
   */
  getJalopnikNews(): Observable<any> {
    return this.http.get('http://localhost:4200/jalopnik', {responseType: 'text'})
      .pipe(
        tap( // Log the result or error
          (/* data */) => console.log('fetched getJalopnikNews')
        ),
        catchError(error => throwError(error))
      );
  }
}

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadUser, loadUserFail, loadUserSuccess} from "./user.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {BackendService} from "../core/services/backend.service";

@Injectable()
export class UserEffect {
  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    mergeMap(() => this.backendService.getJalopnikNews()
      .pipe(
        map(response => (loadUserSuccess({user: response}))),
        catchError((error) => {
            return of(loadUserFail(error));
          }
        ))
    )
  ));

  constructor(
    private actions$: Actions,
    private backendService: BackendService
  ) {
  }
}

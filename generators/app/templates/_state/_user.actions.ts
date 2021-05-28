import {createAction, props} from "@ngrx/store";

export const loadUser = createAction(
  '[User/API] load user'
);
export const loadUserSuccess = createAction(
  '[User/API] load User success',
  props<{ user: string }>() // or  User Object
);
export const loadUserFail = createAction(
  '[User/API] load User fail',
  props<Error>()
);

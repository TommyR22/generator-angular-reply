import {initialUserState, UserState} from "./user.state";
import {Action, createReducer, on} from "@ngrx/store";
import {loadUser, loadUserFail, loadUserSuccess} from "./user.actions";

export const userReducer = createReducer(
  initialUserState,
  on(loadUser, state => ({ ...state, loading: true })),
  on(loadUserSuccess, (state: UserState, { user }) => ({ ...state, loading: false, user })),
  on(loadUserFail, (state: UserState, error: Error) => ({ ...state, loading: false, error }))
);
export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

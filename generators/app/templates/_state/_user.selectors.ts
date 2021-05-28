import {AppState} from "./app.state";
import {createSelector} from "@ngrx/store";
import {UserState} from "./user.state";

export const selectUser = (state: AppState) => state.user;
export const selectUserInfo = createSelector(
  selectUser,
  (state: UserState) => state.user
);

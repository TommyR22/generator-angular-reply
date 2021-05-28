export interface UserState {
  readonly user: string; // Readonly<User>
}
export const initialUserState: UserState = {
  user: ''
};

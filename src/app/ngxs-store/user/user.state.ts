import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from '../../models/user.model';
import { AddUser } from './user.actions';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    loaded: false,
    loggedIn: false,
    activated: false,
  },
})
export class UserState {
  @Selector()
  static getUser(state: UserStateModel) {
    return state;
  }

  @Selector()
  static isLoaded(state: UserStateModel) {
    return state.loaded;
  }

  // @Selector()
  // static isLoggedIn(state: UserStateModel) {
  //   return state.loggedIn;
  // }

  @Action(AddUser)
  addUser({ setState }: StateContext<UserStateModel>, { payload }: AddUser) {
    // const state = getState();
    setState(payload);
  }
}

import { UserStateModel } from '../../models/user.model';

export class AddUser {
  static readonly type = '[User] Add';

  constructor(public payload: UserStateModel) {}
}

export class AddAccessToken {
  static readonly type = '[User] Add Token';

  constructor(public payload: string) {}
}

export class LogoutUser {
  static readonly type = '[User] Logout';

  constructor(public payload: UserStateModel) {}
}

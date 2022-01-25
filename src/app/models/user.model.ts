import { UserRole } from './userRole.model';

export class User {
  _id: string;

  username: string;

  email: string;

  firstName: string;

  lastName: string;

  activated: boolean;

  userRole: UserRole;

  subject: string;

  school: string;

  // exams: Exam[];

  // activities: Activity[];

  // presences: Presence[];

  // classes: Class[];
}

export interface UserStateModel {
  _id?: string;
  username?: string;
  role?: string;
  loaded: boolean;
  loggedIn: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  school?: string;
  subject?: string;
}

export class Login {
  username: string;

  password: string;
}

export class AccessToken {
  accessToken: string;
}

export class TokenWithRefresh {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}

export interface UserDecodedModel {
  _id: string;
  username: string;
  role: string;
}

export class RegisterCustomerDto {
  username: string;

  firstName: string;

  lastName: string;

  password: string;

  email: string;

  school: string;

  subject: string;
}

export class ChangeUserPWDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class ResetPasswordDto {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

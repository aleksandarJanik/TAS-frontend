import { User } from './user.model';

export class Notification {
  _id: string;

  message: string;

  isNew: boolean;

  user: User;

  quiz: string;
}

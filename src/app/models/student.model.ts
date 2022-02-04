import { Activity } from './activity.model';

export class Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  activities: Activity[];
  isPresent: boolean = true;
  isPicked: boolean = false;
}

export class StudentDto {
  firstName: string;
  lastName: string;
  email: string;
  class: string;
}

import { Activity } from './activity.model';
import { Result } from './result.model';
import { StudentSpecialToken } from './specialTokenStudent.model';

export class Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  activities: Activity[];
  isPresent: boolean = true;
  isPicked: boolean = false;
  results: Result[];
  tokens: StudentSpecialToken[];
}

export class StudentDto {
  firstName: string;
  lastName: string;
  email: string;
  class: string;
}

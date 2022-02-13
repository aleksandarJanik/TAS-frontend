import { User } from './user.model';

export class Class {
  _id: string;

  name: string;

  school: string;

  user: User;

  // students: Student[];
}

export class ClassDto {
  name: string;
}

export class ClassWithStats extends Class {
  averageGrade: number;
  numGradeOne: number;
  numGradeTwo: number;
  numGradeThree: number;
  numGradeFour: number;
  numGradeFive: number;
}

import { Class } from './class.model';
import { Exam } from './exam.model';
import { Student } from './student.model';
import { User } from './user.model';

export class StudentSpecialToken {
  _id: string;

  email: string;

  class: Class;

  user: User;

  exam: Exam;

  student: Student;

  time: string;

  //   @ApiProperty({ type: String })
  //   @Prop({ index: true })
  //   token: string;
}

export class StudentSpecialTokenDto {
  email: string;
  student: string;
  class: string;
  exam: string;
}

export class SaveTimeDto {
  time: string;
  token: string;
}

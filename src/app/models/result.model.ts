import { Class } from './class.model';
import { Exam } from './exam.model';
import { Student } from './student.model';

export class Result {
  _id: string;

  class: Class;

  user: string;

  exam: Exam;

  student: Student;

  numCorrectAnswers: number;

  grade: number;

  gradePercentage: number;

  questionsFromStudent: QuestionForStudent[];

  createdAt: Date;

  updatedAt: Date;
}

// export class ClassNameResult {
//   results: Result[];
//   className: string;
// }

export class QuestionForStudent {
  answers: string[];
  questionId: string;
  isCorrect: boolean;
}

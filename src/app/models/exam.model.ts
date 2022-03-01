export enum TypeQuestion {
  SHORT_ANSWER,
  RADIO,
  CHECKBOXES,
  DROPDOWN,
}
export class ExamDto {
  name: string;
}
export class Exam {
  _id: string;

  name: string;

  description: string;

  questions: QuestionViewDto[];

  createdAt: Date;

  updatedAt: Date;
}

export class QuestionViewDto {
  _id: string;

  question: string;

  type: TypeQuestion = TypeQuestion.CHECKBOXES;

  answers: string[];

  correctAnswers: string[];

  isRequired = true;

  createdAt: Date;

  updatedAt: Date;
}

export class QuestionCreateDto {
  question: string;

  type: TypeQuestion;

  answers: string[];

  correctAnswers: string[];

  isRequired = true;
}

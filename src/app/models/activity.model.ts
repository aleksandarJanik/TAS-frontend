export class Activity {
  _id: string;

  grade: string;

  class: string;

  student: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;
}

export class ActivityDto {
  name: string;

  grade: string;

  student: string;

  class: string;
}

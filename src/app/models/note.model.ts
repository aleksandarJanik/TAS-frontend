export class Note {
  _id: string;

  key: string;

  value: string;

  user: string;

  color?: string;
}

export class NoteDto {
  key: string;

  value: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Note, NoteDto } from '../models/note.model';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  async getNotes() {
    let notes = await lastValueFrom(
      this.http.get<Note[]>(`${AppConstants.API_URL}/note`)
    );
    return notes;
  }

  async updateNotes(updateNoteDto: NoteDto, noteId: string) {
    let notes = await lastValueFrom(
      this.http.put<Note>(
        `${AppConstants.API_URL}/note/${noteId}`,
        updateNoteDto
      )
    );
    return notes;
  }

  async removeNote(noteId: string) {
    let note = await lastValueFrom(
      this.http.delete<Note>(`${AppConstants.API_URL}/note/${noteId}`)
    );
    return note;
  }

  async createNote(noteKey: string) {
    let noteDto: NoteDto = {
      key: noteKey,
      value: '',
    };
    let notes = await lastValueFrom(
      this.http.post<Note>(`${AppConstants.API_URL}/note`, noteDto)
    );
    return notes;
  }
}

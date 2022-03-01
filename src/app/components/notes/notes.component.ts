import { Component, OnInit } from '@angular/core';
import { Note, NoteDto } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[];
  constructor(
    private noteService: NotesService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    this.notes = await this.noteService.getNotes();
    console.log('notes: ', this.notes);
    for (let n of this.notes) {
      n.color = this.storageService.getColorNote(n._id) as string;
    }
  }

  async saveText(noteId: string, event: any) {
    let note = this.notes.find((n) => n._id === noteId);
    note = note as Note;

    let updateNoteDto: NoteDto = {
      key: note.key,
      value: note.value,
    };
    try {
      await this.noteService.updateNotes(updateNoteDto, noteId);
    } catch (e) {}
  }
  async removeNote(noteId: string) {
    try {
      let result = await Swal.fire({
        icon: 'warning', //"success" | "error" | "warning" | "info" | "question"
        title: 'Note removal!',
        text: 'You are about to remove the note, Are you sure?!',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        backdrop: false,
        // footer: '',
      });
      if (result.isConfirmed) {
        await this.noteService.removeNote(noteId);
        this.notes = this.notes.filter((note) => note._id !== noteId);
      }
    } catch (e) {}
  }

  setColor(color: string, noteId: string) {
    this.storageService.setColorNote(color, noteId);
    let indexNote = this.notes.findIndex((n) => n._id === noteId);
    this.notes[indexNote].color = color;
  }
}

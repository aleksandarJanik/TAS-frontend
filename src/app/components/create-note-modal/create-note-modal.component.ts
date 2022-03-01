import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-note-modal',
  templateUrl: './create-note-modal.component.html',
  styleUrls: ['./create-note-modal.component.css'],
})
export class CreateNoteModalComponent implements OnInit {
  noteKey = '';
  constructor(
    private notesService: NotesService,
    public dialogRef: MatDialogRef<CreateNoteModalComponent>,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  async createNote() {
    if (this.noteKey !== '') {
      try {
        await this.notesService.createNote(this.noteKey);
        this.dialogRef.close({ data: 'confirmed' });
        this._router.navigate(['/login']);
      } catch (e) {
        console.log(e);
      }
    } else {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'Required values!',
        text: 'Note title is Required!.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
    }
  }
}

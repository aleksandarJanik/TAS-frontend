import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam, UpdateSettingsExamDto } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configure-quiz-page',
  templateUrl: './configure-quiz-page.component.html',
  styleUrls: ['./configure-quiz-page.component.scss'],
})
export class ConfigureQuizPageComponent implements OnInit {
  exam: Exam;
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    let testId = this.route.snapshot.paramMap.get('id');
    this.exam = await this.examService.getExamById(testId);
    console.log(this.exam);
  }
  goToPreview() {
    if (this.exam.questions.length > 0) {
      this._router.navigate([`/preview/${this.exam._id}`]);
    } else {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'Add question!',
        text: 'Please add at least one question for previewing the quiz!',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
    }
  }
  isCorrect() {
    let firstChar = this.exam.time.split('')[0];
    let secondChar = this.exam.time.split('')[1];
    let thirdChar = this.exam.time.split('')[2];
    let fourChar = this.exam.time.split('')[3];
    let fiveChar = this.exam.time.split('')[4];
    if (
      this.exam.time.split('').length !== 5 ||
      isNaN(parseInt(firstChar)) ||
      isNaN(parseInt(secondChar)) ||
      thirdChar !== ':' ||
      isNaN(parseInt(fourChar)) ||
      isNaN(parseInt(fiveChar))
    ) {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'Plase set correct format!',
        text: 'The time entered in not in the correct format (hh:mm - hours:minutes)!',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
      this.exam.time = '';
    }
    console.log(this.exam);
  }
  async save() {
    let updateSettingsExamDto: UpdateSettingsExamDto = {
      grade1: this.exam.grade1,
      grade2: this.exam.grade2,
      grade3: this.exam.grade3,
      grade4: this.exam.grade4,
      grade5: this.exam.grade5,
      hasTimeLimit: this.exam.hasTimeLimit,
      showResutPage: this.exam.showResutPage,
      time: this.exam.time ? this.exam.time : '',
    };
    try {
      await this.examService.saveSettings(updateSettingsExamDto, this.exam._id);
      this._snackBar.open('Data saved!', 'close', {
        duration: 1500,
      });
    } catch (e) {
      this._snackBar.open('not saved!', 'close', {
        duration: 1500,
      });
    }
  }
  async goToAnalyze(exam: Exam) {
    let hasResults = await this.examService.checkIfExamHasResults(exam._id);
    if (hasResults) {
      this._router.navigate([`/analyze/${exam._id}`]);
    } else {
      Swal.fire({
        icon: 'info', //"success" | "error" | "warning" | "info" | "question"
        title: 'No submissions found!',
        text: 'You need one submission at least to preview the results!',
        showCancelButton: false,
        confirmButtonText: 'Ok',
        backdrop: false,
        // timer: 1000,
        // footer: '',
      });
    }
  }
}

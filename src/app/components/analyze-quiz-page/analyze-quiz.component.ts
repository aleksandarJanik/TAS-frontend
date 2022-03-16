import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { Exam } from 'src/app/models/exam.model';
import { Result } from 'src/app/models/result.model';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';
import { ResultsSpecificQuestionInModalComponent } from '../results-specific-question-in-modal/results-specific-question-in-modal.component';

@Component({
  selector: 'app-analyze-quiz',
  templateUrl: './analyze-quiz.component.html',
  styleUrls: ['./analyze-quiz.component.scss'],
})
export class AnalyzeQuizComponent implements OnInit {
  classesNameResult: any = {};
  resultId: string;
  exam: Exam;
  classesNames: string[];
  public displayedColumns: string[] = [
    'student',
    'email',
    'date_submitted',
    'grade',
    'score',
    'set',
  ];
  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.resultId = this.route.snapshot.paramMap.get('id') as string;
    this.classesNames = await this.examService.getNamesOfClasses(this.resultId);
    let results: Result[] = await this.examService.getFinishedResults(
      this.resultId
    );
    this.exam = await this.examService.getExamById(results[0].exam._id);
    for (let c of this.classesNames) {
      let resultsFiltered = results.filter((r) => r.class.name === c);
      this.classesNameResult[c] = resultsFiltered;
    }
    console.log('results: ', results);
    console.log('classesNames: ', this.classesNameResult);
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

  viewResult(result: Result) {
    let dialogRef = this.dialog.open(ResultsSpecificQuestionInModalComponent, {
      height: '70%',
      width: '70%',
      data: { result: result },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data === 'confirmed') {
      }
    });
  }

  exportInCsv(className: string) {
    console.log(this.classesNameResult[className]);
    let arrToExport: any[] = this.classesNameResult[className].map(
      (elem: any) => {
        return {
          class: elem.className,
          first_name: elem.student.firstName,
          last_name: elem.student.lastName,
          email: elem.student.email,
          date_submitted: elem.createdAt,
          grade: elem.grade,
          score: `${elem.numCorrectAnswers} / ${
            elem.exam.questions.length
          } (${elem.gradePercentage.toFixed(0)}%)`,
        };
      }
    );

    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: `Class ${this.classesNameResult[className][0].className} results`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      useHeader: false,
      nullToEmptyString: true,
      headers: [
        'Class',
        'First Name',
        'Last name',
        'Email',
        'Date submitted',
        'Grade',
        'Score',
      ],
    };
    // console.log(arrToExport);
    let date = new Date();

    new AngularCsv(
      arrToExport,
      `Class_${
        this.classesNameResult[className][0].className
      }_results_${date.toLocaleDateString('en-US')}`,
      options
    );
  }
  exportInPdf(className: string) {}
}

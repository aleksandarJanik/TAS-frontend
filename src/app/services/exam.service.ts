import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Class, ClassDto, ClassWithStats } from '../models/class.model';
import {
  Exam,
  ExamDto,
  FinishedExamDto,
  QuestionCreateDto,
  QuestionViewDto,
  UpdateSettingsExamDto,
} from '../models/exam.model';
import { Result } from '../models/result.model';
import {
  SaveTimeDto,
  StudentSpecialToken,
  StudentSpecialTokenDto,
} from '../models/specialTokenStudent.model';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  // async getClasses() {
  //   let classes = await lastValueFrom(
  //     this.http.get<Class[]>(`${AppConstants.API_URL}/class`)
  //   );
  //   return classes;
  // }

  async createExam(examDto: ExamDto) {
    let exam = await lastValueFrom(
      this.http.post<Exam>(`${AppConstants.API_URL}/exam`, examDto)
    );
    return exam;
  }

  async getExamById(examId: any): Promise<Exam> {
    let exam = await lastValueFrom(
      this.http.get<Exam>(`${AppConstants.API_URL}/exam/${examId}`)
    );
    return exam;
  }

  async getExamToStartQuiz(examId: any, userId: any): Promise<Exam> {
    let exam = await lastValueFrom(
      this.http.get<Exam>(
        `${AppConstants.API_URL}/exam/${examId}/teacher/${userId}`
      )
    );
    return exam;
  }

  async getExams(): Promise<Exam[]> {
    let exam = await lastValueFrom(
      this.http.get<Exam[]>(`${AppConstants.API_URL}/exam`)
    );
    return exam;
  }

  async removeExam(examId: string) {
    let exam = await lastValueFrom(
      this.http.delete<Exam>(`${AppConstants.API_URL}/exam/${examId}`)
    );
    return exam;
  }

  async addQuestion(questionCreateDto: QuestionCreateDto, examId: string) {
    let question = await lastValueFrom(
      this.http.post<Exam>(
        `${AppConstants.API_URL}/exam/${examId}/question`,
        questionCreateDto
      )
    );
    return question;
  }

  async addDescription(examId: string, desc: string) {
    let exam = await lastValueFrom(
      this.http.put<Exam>(
        `${AppConstants.API_URL}/exam/${examId}/description`,
        { desc }
      )
    );
    return exam;
  }

  async addTitle(examId: string, title: string) {
    let exam = await lastValueFrom(
      this.http.put<Exam>(`${AppConstants.API_URL}/exam/${examId}/title`, {
        title,
      })
    );
    return exam;
  }

  async removeQuestion(examId: string, questionId: string) {
    let question = await lastValueFrom(
      this.http.delete<QuestionViewDto>(
        `${AppConstants.API_URL}/exam/${examId}/question/${questionId}`
      )
    );
    return question;
  }

  async saveQuestion(
    questionCreateDto: QuestionCreateDto,
    examId: string,
    questionId: string
  ) {
    let question = await lastValueFrom(
      this.http.put<Exam>(
        `${AppConstants.API_URL}/exam/${examId}/question/${questionId}`,
        questionCreateDto
      )
    );
    return question;
  }

  async saveSettings(
    updateSettingsExamDto: UpdateSettingsExamDto,
    examId: string
  ) {
    let exam = await lastValueFrom(
      this.http.put<Exam>(
        `${AppConstants.API_URL}/exam/${examId}/settings`,
        updateSettingsExamDto
      )
    );
    return exam;
  }

  async sendQuiz(studentSpecialTokenDto: StudentSpecialTokenDto[]) {
    let tokens = await lastValueFrom(
      this.http.post<StudentSpecialToken>(
        `${AppConstants.API_URL}/student-special-token`,
        studentSpecialTokenDto
      )
    );
    return tokens;
  }

  async checkToken(token: string) {
    let tokenFromDb = await lastValueFrom(
      this.http.get<StudentSpecialToken>(
        `${AppConstants.API_URL}/student-special-token/${token}`
      )
    );
    return tokenFromDb;
  }

  async saveTime(saveTimeDto: SaveTimeDto) {
    let tokenFromDb = await lastValueFrom(
      this.http.post<SaveTimeDto>(
        `${AppConstants.API_URL}/student-special-token/save-time`,
        saveTimeDto
      )
    );
    return tokenFromDb;
  }

  async finishExam(finishedExamDto: FinishedExamDto) {
    let tokenFromDb = await lastValueFrom(
      this.http.post<Result>(
        `${AppConstants.API_URL}/student-special-token/finished-exam`,
        finishedExamDto
      )
    );
    return tokenFromDb;
  }

  async removeCurrentExam(token: string) {
    let tokenFromDb = await lastValueFrom(
      this.http.delete<StudentSpecialToken>(
        `${AppConstants.API_URL}/student-special-token/${token}`
      )
    );
    return tokenFromDb;
  }

  async getFinishedResults(examId: string) {
    let results: Result[] = await lastValueFrom(
      this.http.get<Result[]>(`${AppConstants.API_URL}/result/exam/${examId}`)
    );
    return results;
  }

  async checkIfExamHasResults(examId: string) {
    let result: boolean = await lastValueFrom(
      this.http.post<boolean>(
        `${AppConstants.API_URL}/result/check-exam/${examId}`,
        {}
      )
    );
    return result;
  }

  async getNamesOfClasses(examId: string) {
    let results: string[] = await lastValueFrom(
      this.http.get<string[]>(
        `${AppConstants.API_URL}/result/class-names/${examId}`
      )
    );
    return results;
  }
}

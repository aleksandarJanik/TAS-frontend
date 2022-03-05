import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Class, ClassDto, ClassWithStats } from '../models/class.model';
import {
  Exam,
  ExamDto,
  QuestionCreateDto,
  QuestionViewDto,
  UpdateSettingsExamDto,
} from '../models/exam.model';
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
}

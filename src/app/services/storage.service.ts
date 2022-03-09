import { Injectable } from '@angular/core';
import { ChoosenQuestion } from '../models/exam.model';

const JWT_TOKEN_KEY = 'JWT-KEY';
const REFRESH_TOKEN_KEY = 'REFRESH-KEY';
const BULK_SUBMISSION_KEY = 'BULK_SUBMISSION_KEY';
const COLOR_THEME_KEY = 'COLOR_THEME_KEY';
const CHOOSEN_QUESTION_KEY = 'CHOOSEN_QUESTION_KEY';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  addAccessToken(token: string) {
    localStorage.setItem(JWT_TOKEN_KEY, token);
  }
  async getAccessToken() {
    return await localStorage.getItem(JWT_TOKEN_KEY);
  }

  removeAccessToken() {
    localStorage.removeItem(JWT_TOKEN_KEY);
  }

  addRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  setColorNote(color: string, noteId: string) {
    return localStorage.setItem(noteId, color);
  }

  getColorNote(noteId: string) {
    return localStorage.getItem(noteId);
  }

  setQuestionExamDto(questionId: string, choosenQuestion: any) {
    return localStorage.setItem(questionId, JSON.stringify(choosenQuestion));
  }

  getQuestionExamDto(questionId: string): any | null {
    let elem = localStorage.getItem(questionId) as string;
    // console.log('elem', elem);
    if (elem === null) {
      return null;
    }
    let newelem: any = JSON.parse(elem);
    // console.log('elem:', newelem);
    // let elemJson: ChoosenQuestion = {
    //   answers: newelem['answers'],
    //   questionId: newelem['questionId'],
    // };
    return newelem;
  }
  removeQuestionExamDto(questionId: string) {
    localStorage.removeItem(questionId);
  }

  setCheckBoxesExamDto(questionId: string, checkboxes: any) {
    return localStorage.setItem(questionId + '_', JSON.stringify(checkboxes));
  }
  getheckBoxesExamDto(questionId: string): any | null {
    let elem = localStorage.getItem(questionId + '_') as string;
    console.log('elem', elem);
    let newelem: any = JSON.parse(elem);

    return newelem;
  }
}

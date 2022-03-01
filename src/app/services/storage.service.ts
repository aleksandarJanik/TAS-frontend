import { Injectable } from '@angular/core';

const JWT_TOKEN_KEY = 'JWT-KEY';
const REFRESH_TOKEN_KEY = 'REFRESH-KEY';
const BULK_SUBMISSION_KEY = 'BULK_SUBMISSION_KEY';
const COLOR_THEME_KEY = 'COLOR_THEME_KEY';

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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Student, StudentDto } from '../models/student.model';
import { AppConstants } from '../shared/constants';
import { Notification } from 'src/app/models/Notification.model';
import { ItemNumber } from '../models/global.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  async getNotificvationsForUser() {
    let notifications = await lastValueFrom(
      this.http.get<Notification[]>(`${AppConstants.API_URL}/notification`)
    );
    return notifications;
  }

  async getNumberOfNewNotifications(): Promise<ItemNumber> {
    let notificationNumber = await lastValueFrom(
      this.http.get<ItemNumber>(`${AppConstants.API_URL}/notification/number`)
    );
    return notificationNumber;
  }
}

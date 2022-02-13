import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Activity, ActivityDto } from '../models/activity.model';
import { Class, ClassDto } from '../models/class.model';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  async getActivities(studentId: string) {
    let classes = await lastValueFrom(
      this.http.get<Activity[]>(`${AppConstants.API_URL}/activity/${studentId}`)
    );
    return classes;
  }

  async createActivity(activityDto: ActivityDto) {
    let activity = await lastValueFrom(
      this.http.post<Activity>(`${AppConstants.API_URL}/activity`, activityDto)
    );
    return activity;
  }

  async removeActivity(activityId: string, classId: string, studentId: string) {
    let activity = await lastValueFrom(
      this.http.delete<Activity>(
        `${AppConstants.API_URL}/activity/${activityId}/class/${classId}/student/${studentId}`
      )
    );
    return activity;
  }

  async updateActivity(activityDto: ActivityDto, activityId: string) {
    let activity = await lastValueFrom(
      this.http.put<Activity>(
        `${AppConstants.API_URL}/activity/${activityId}`,
        activityDto
      )
    );
    return activity;
  }
}

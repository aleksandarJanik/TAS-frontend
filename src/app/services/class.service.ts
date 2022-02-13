import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Class, ClassDto, ClassWithStats } from '../models/class.model';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private http: HttpClient) {}

  async getClasses() {
    let classes = await lastValueFrom(
      this.http.get<Class[]>(`${AppConstants.API_URL}/class`)
    );
    return classes;
  }

  async createClasses(classDto: ClassDto) {
    let classFromDb = await lastValueFrom(
      this.http.post<Class>(`${AppConstants.API_URL}/class`, classDto)
    );
    return classFromDb;
  }

  async deleteClass(classId: string) {
    return await lastValueFrom(
      this.http.delete<Class>(`${AppConstants.API_URL}/class/${classId}`)
    );
  }

  async getClassById(classId: any): Promise<Class> {
    let classFromDb = await lastValueFrom(
      this.http.get<Class>(`${AppConstants.API_URL}/class/${classId}`)
    );
    return classFromDb;
  }

  async getClassesWithStats(): Promise<ClassWithStats[]> {
    let classes: ClassWithStats[] = await lastValueFrom(
      this.http.get<ClassWithStats[]>(
        `${AppConstants.API_URL}/class/with-statistics`
      )
    );
    return classes;
  }
}

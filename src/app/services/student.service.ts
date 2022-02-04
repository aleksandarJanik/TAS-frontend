import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Student, StudentDto } from '../models/student.model';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  public presentStudents: Student[];
  constructor(private http: HttpClient) {}

  async createStudent(studentDto: StudentDto) {
    let studentFromDb = await lastValueFrom(
      this.http.post<Student>(`${AppConstants.API_URL}/student`, studentDto)
    );
    return studentFromDb;
  }

  async getStudentsByClassId(classId: any) {
    let students = await lastValueFrom(
      this.http.get<Student[]>(`${AppConstants.API_URL}/student/${classId}`)
    );
    return students;
  }

  async removeStudent(classId: any, studentId: any) {
    let students = await lastValueFrom(
      this.http.delete<Student>(
        `${AppConstants.API_URL}/student/${studentId}/class/${classId}`
      )
    );
    return students;
  }

  async updateStudent(studentDto: StudentDto, studentId: any) {
    let studentFromDb = await lastValueFrom(
      this.http.put<Student>(
        `${AppConstants.API_URL}/student/${studentId}`,
        studentDto
      )
    );
    return studentFromDb;
  }
}

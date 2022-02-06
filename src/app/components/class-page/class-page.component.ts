import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-page',
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.css'],
})
export class ClassPageComponent implements OnInit {
  classesFromDb: Class[];

  constructor(
    private authService: AuthService,
    private classService: ClassService
  ) {}

  async ngOnInit() {
    await this.getClasses();
  }
  async logout() {
    await this.authService.logout();
  }
  async reloadClasses() {
    await this.getClasses();
  }
  async getClasses() {
    this.classesFromDb = await this.classService.getClasses();
  }

  async deleteClass(classId: string, className: string) {
    let result = await Swal.fire({
      icon: 'question', //"success" | "error" | "warning" | "info" | "question"
      title: 'Want remove class?!',
      text: `You are about to remove the class ${className.toUpperCase()}. Are you sure?.`,
      showCancelButton: true,
      confirmButtonText: 'Ok',
      backdrop: false,
      // footer: '',
    });
    if (result.isConfirmed) {
      try {
        await this.classService.deleteClass(classId);
        this.classesFromDb = this.classesFromDb.filter(
          (s) => s._id !== classId
        );
      } catch (e) {}
    }
  }
}

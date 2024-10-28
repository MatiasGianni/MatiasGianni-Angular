import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from './models';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'], 
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  dataSource = new MatTableDataSource<Course>(); 
  isLoading = false; 
  displayedColumns: string[] = ['id', 'name', 'description', 'createdAt', 'actions'];

  constructor(private coursesService: CoursesService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true; 
    this.coursesService.getCourse().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.dataSource.data = this.courses;
      },
      complete: () => this.isLoading = false 
    });
  }

  addCourse(course: Omit<Course, 'id' | 'createdAt'>): void {
    this.coursesService.createCourses(course).subscribe({
      next: (newCourse) => {
        this.courses = [...this.courses, newCourse];
        this.dataSource.data = this.courses;
      },
    });
  }

  openModal(editingCourse?: Course): void {
    const dialogRef = this.matDialog.open(CoursesDetailComponent, {
      data: {
        editingCourse,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (editingCourse) {
          this.updateCourse(editingCourse.id, result);
        } else {
          this.addCourse(result); 
        }
      }
    });
  }

  updateCourse(id: string, updatedCourse: Course): void {
    this.coursesService.updateCourse(id, updatedCourse).subscribe({
      next: () => this.loadCourses(), // Reload the courses after updating
    });
  }

  goToDetail(id: string): void {
    // Logic for navigating to course details
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.coursesService.deleteCourse(id).subscribe(() => {
        this.loadCourses(); // Reload courses after deletion
      });
    }
  }
}

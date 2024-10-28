import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { Course } from './models';
import { CoursesService } from '../../../core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Course>();
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log('CoursesComponent ha sido creado');
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    console.log('Cargando cursos...');
    this.coursesService.getCourse().subscribe({
      next: (courses) => {
        console.log(courses);
        this.dataSource.data = courses;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.isLoading = true;
      this.coursesService.deleteCourse(id).subscribe({
        next: (courses) => {
          this.dataSource.data = courses;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute });
  }

  openModal(editingCourse?: Course): void {
    this.matDialog
      .open(CoursesDetailComponent, {
        data: {
          editingCourse,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (editingCourse) {
            this.handleUpdate(editingCourse.id, result);
          } else {
            this.coursesService.createCourses(result).subscribe({
              next: (newCourse) => {
                this.dataSource.data = [...this.dataSource.data, newCourse];
              },
            });
          }
        }
      });
  }

  handleUpdate(id: string, updatedCourse: Course): void {
    this.isLoading = true;
    this.coursesService.updateCourse(id, updatedCourse).subscribe({
      next: (courses) => {
        this.dataSource.data = courses;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}

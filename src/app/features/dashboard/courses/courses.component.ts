import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from './models';
import { CoursesService } from '../../../core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';

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
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
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
  
  

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.isLoading = true;
      this.coursesService.removeCourseById(id).subscribe({
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

  goToEdit(id: string): void {
    const courseToEdit = this.dataSource.data.find(course => course.id === id);
    this.openModal(courseToEdit); 
  }
  

  openModal(editingCourse?: Course): void {
    
  
    this.matDialog
      .open(CoursesDialogComponent, {
        data: {
          editingCourse,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingCourse) {
              
              this.handleUpdate(editingCourse.id, result);
            } else {
              this.coursesService.createCourse(result).subscribe({
                next: () => {
                  this.loadCourses();
                },
                error: () => {
                  console.error("Error al agregar el curso.");
                }
              });
            }
          }
        },
      });
  }
  
  
  
  handleUpdate(id: string, updatedCourse: Course): void {
    if (!id) {
      console.error("ID del curso no válido:", id); 
      return;
    }
    
    this.isLoading = true;
    this.coursesService.updateCourseById(id, updatedCourse).subscribe({
      next: (courses) => {
        this.dataSource.data = courses; 
      },
      error: (err) => {
        console.error('Error al actualizar el curso:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}  
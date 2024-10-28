import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassesDetailComponent } from './classes-detail/classes-detail.component';
import { Class } from './models';
import { ClassesService } from '../../../core/services/classes.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'teacher', 'hours', 'classroom', 'actions'];
  dataSource = new MatTableDataSource<Class>();
  isLoading = false;

  constructor(
    private classesService: ClassesService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.isLoading = true;
    this.classesService.getClasses().subscribe({
      next: (classes) => {
        this.dataSource.data = classes;
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
    if (confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      this.isLoading = true;
      this.classesService.deleteClass(id).subscribe({
        next: (classes) => {
          this.dataSource.data = classes;
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

  openModal(editingClass?: Class): void {
    this.matDialog
      .open(ClassesDetailComponent, {
        data: { editingClass },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (editingClass) {
            this.handleUpdate(editingClass.id, result);
          } else {
            this.classesService.createClass(result).subscribe({
              next: (newClass) => {
                this.dataSource.data = [...this.dataSource.data, newClass];
              },
            });
          }
        }
      });
  }

  handleUpdate(id: string, updatedClass: Class): void {
    this.isLoading = true;
    this.classesService.updateClass(id, updatedClass).subscribe({
      next: (classes) => {
        this.dataSource.data = classes;
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

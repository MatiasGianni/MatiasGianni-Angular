import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassesDetailComponent } from './classes-detail/classes-detail.component';
import { Class } from './models';
import { ClassesService } from '../../../core/services/classes.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesDialogComponent } from './classes-dialog/classes-dialog.component';

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
      this.classesService.removeClassById(id).subscribe({
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

 /* openModal(editingClass?: Class): void {
    this.matDialog
      .open(ClassesDialogComponent, {
        data: { editingClass },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (editingClass) {
            this.handleUpdate(editingClass.id, result);
          } else {
            this.classesService.addClass(result).subscribe({
              next: (updatedClasses) => {
                this.dataSource.data = updatedClasses;
              },
            });
          }
        }
      });
  }*/

  openModal(editingClass?: Class): void {
    this.matDialog
      .open(ClassesDialogComponent, {
        data: { editingClass },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (editingClass) {
            this.handleUpdate(editingClass.id, result); // Aquí usa `editingClass.id`
          } else {
            this.classesService.addClass(result).subscribe({
              next: (updatedClasses) => {
                this.dataSource.data = updatedClasses;
              },
            });
          }
        }
      });
  }
  

  handleUpdate(id: string, updatedClass: Partial<Class>): void {
    this.isLoading = true;
    this.classesService.updateClassById(id, updatedClass).subscribe({
      next: (updatedClasses) => {
        this.dataSource.data = updatedClasses;
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

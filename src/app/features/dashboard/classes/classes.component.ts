import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassesDialogComponent } from './classes-dialog/classes-dialog.component';
import { Class } from './models';
import { ClassesService } from '../../../core/services/classes.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
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
        if (Array.isArray(classes)) {
          this.dataSource.data = classes;
        } else {
          console.error('La respuesta no es un arreglo:', classes);
        }
      },
      error: (err) => {
        console.error('Error al cargar clases:', err);
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
        next: () => {
          this.loadClasses(); 
        },
        error: (err) => {
          console.error('Error al eliminar la clase:', err);
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
              next: () => {
                this.loadClasses(); 
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
      });
  }
  
  handleUpdate(id: string, updatedClass: Partial<Class>): void {
    this.isLoading = true;
    this.classesService.updateClassById(id, updatedClass).subscribe({
      next: (updatedClassResponse) => {
        const index = this.dataSource.data.findIndex((classItem) => classItem.id === id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedClassResponse;
          this.dataSource._updateChangeSubscription();
        }
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
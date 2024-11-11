import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from '../../../../core/services/classes.service';
import { Class } from '../models';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss'],
})
export class ClassesDetailComponent implements OnInit {
  idClass?: string;
  class?: Class;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private classesService: ClassesService
  ) {
    
    this.idClass = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.classesService
      .getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (classData) => {
          this.class = classData;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../models';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss'],
})
export class CoursesDetailComponent implements OnInit {
  idCourse?: string;
  course?: Course;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) {
    
    this.idCourse = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService
      .getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
          this.course = course;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
}

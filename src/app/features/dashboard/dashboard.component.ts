import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './users/models';
import { selectAutheticatedUser } from '../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<User | null>;


  constructor(private router: Router, private authService: AuthService,private store: Store) {
    this.authUser$ = this.store.select(selectAutheticatedUser);
  }

  logout(): void {
    this.authService.logout();
  }
}

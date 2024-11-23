import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from '../../features/dashboard/registrations/models';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}
  getRegistration(): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(
      `${environment.apiBaseURL}/registration`
    );
  }
  createSale(
    paylood: Omit<Registration, 'id' | 'user' | 'course'>
  ): Observable<Registration> {
    return this.httpClient.post<Registration>(
      `${environment.apiBaseURL}/registration`,
      paylood
    );
  }
}

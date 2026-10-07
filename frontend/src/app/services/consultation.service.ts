import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = `${environment.apiUrl}/consultations`;

  constructor(private http: HttpClient) {}

  createConsultation(consultationPayload: any): Observable<Consultation> {
    return this.http.post<Consultation>(this.apiUrl, consultationPayload);
  }

  getConsultationById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/${id}`);
  }

  getConsultationsByPatientId(patientId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getConsultationByAppointmentId(appointmentId: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/appointment/${appointmentId}`);
  }
}

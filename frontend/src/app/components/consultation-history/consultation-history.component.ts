import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { PatientService } from '../../services/patient.service';
import { Consultation } from '../../models/consultation.model';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-consultation-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultation-history.component.html'
})
export class ConsultationHistoryComponent implements OnInit {
  patientId: number | null = null;
  patient: Patient | null = null;
  consultations: Consultation[] = [];

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('patientId');
    if (idParam) {
      this.patientId = Number(idParam);
      this.loadPatientInfo(this.patientId);
      this.loadHistory(this.patientId);
    } else {
      this.errorMessage = 'Invalid patient ID.';
      this.isLoading = false;
    }
  }

  loadPatientInfo(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (data) => {
        this.patient = data;
      },
      error: (err) => {
        console.error('Error loading patient info', err);
      }
    });
  }

  loadHistory(id: number): void {
    this.isLoading = true;
    this.consultationService.getConsultationsByPatientId(id).subscribe({
      next: (data) => {
        this.consultations = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load consultation history.';
        console.error(err);
      }
    });
  }
}

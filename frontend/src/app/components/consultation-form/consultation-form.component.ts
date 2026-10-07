import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './consultation-form.component.html'
})
export class ConsultationFormComponent implements OnInit {
  appointmentId: number | null = null;
  appointment: Appointment | null = null;

  // Form Vitals + Notes
  temperature: string = '98.6';
  bloodPressure: string = '120/80';
  notes: string = '';

  // UI State
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('appointmentId');
    if (idParam) {
      this.appointmentId = Number(idParam);
      this.loadAppointmentDetails(this.appointmentId);
    } else {
      this.errorMessage = 'Invalid appointment ID.';
      this.isLoading = false;
    }
  }

  loadAppointmentDetails(id: number): void {
    this.isLoading = true;
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (data) => {
        this.appointment = data;
        this.isLoading = false;

        // Check if consultation already exists for this appointment
        this.consultationService.getConsultationByAppointmentId(id).subscribe({
          next: (existingConsultation) => {
            if (existingConsultation) {
              this.temperature = existingConsultation.temperature;
              this.bloodPressure = existingConsultation.bloodPressure;
              this.notes = existingConsultation.notes;
            }
          },
          error: () => {
            // No existing consultation found, standard new consultation flow
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load appointment information.';
        console.error(err);
      }
    });
  }

  completeConsultation(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.temperature || !this.temperature.trim()) {
      this.errorMessage = 'Temperature is required.';
      return;
    }

    if (!this.bloodPressure || !this.bloodPressure.trim()) {
      this.errorMessage = 'Blood Pressure is required.';
      return;
    }

    if (!this.notes || !this.notes.trim()) {
      this.errorMessage = 'Short consultation notes are required.';
      return;
    }

    if (!this.appointmentId) {
      this.errorMessage = 'Missing appointment context.';
      return;
    }

    const payload = {
      appointment: { id: this.appointmentId },
      temperature: this.temperature.trim(),
      bloodPressure: this.bloodPressure.trim(),
      notes: this.notes.trim(),
      status: 'COMPLETED'
    };

    this.isSubmitting = true;
    this.consultationService.createConsultation(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Consultation completed and saved successfully!';
        setTimeout(() => {
          this.router.navigate(['/appointments']);
        }, 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to complete consultation.';
        console.error(err);
      }
    });
  }
}

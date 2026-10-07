import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './appointment-list.component.html'
})
export class AppointmentListComponent implements OnInit {
  todayAppointments: Appointment[] = [];
  patientsList: Patient[] = [];

  // Form Fields
  selectedPatientId: number | null = null;
  doctorName: string = '';
  appointmentDate: string = '';
  appointmentTime: string = '';

  // UI State
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const todayStr = new Date().toISOString().split('T')[0];
    const hours = String(new Date().getHours()).padStart(2, '0');
    const minutes = String(new Date().getMinutes()).padStart(2, '0');
    
    this.appointmentDate = todayStr;
    this.appointmentTime = `${hours}:${minutes}`;

    this.loadPatients();
    this.loadTodayAppointments();

    // Check query params if patient was selected from patient list
    this.route.queryParams.subscribe(params => {
      if (params['patientId']) {
        this.selectedPatientId = Number(params['patientId']);
      }
    });
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patientsList = data;
      },
      error: (err) => {
        console.error('Failed to load patient dropdown list', err);
      }
    });
  }

  loadTodayAppointments(): void {
    this.appointmentService.getTodayAppointments().subscribe({
      next: (data) => {
        this.todayAppointments = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load today\'s appointments.';
        console.error(err);
      }
    });
  }

  bookAppointment(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedPatientId) {
      this.errorMessage = 'Please select a registered patient.';
      return;
    }

    if (!this.doctorName || !this.doctorName.trim()) {
      this.errorMessage = 'Doctor Name is required.';
      return;
    }

    if (!this.appointmentDate) {
      this.errorMessage = 'Appointment Date is required.';
      return;
    }

    if (!this.appointmentTime) {
      this.errorMessage = 'Appointment Time is required.';
      return;
    }

    // Combine date and time into ISO LocalDateTime format: YYYY-MM-DDTHH:mm:ss
    const dateTimeIso = `${this.appointmentDate}T${this.appointmentTime}:00`;

    const payload = {
      patient: { id: this.selectedPatientId },
      doctorName: this.doctorName.trim(),
      appointmentDateTime: dateTimeIso,
      status: 'BOOKED'
    };

    this.isSubmitting = true;
    this.appointmentService.bookAppointment(payload).subscribe({
      next: (booked) => {
        this.successMessage = `Appointment booked successfully for Patient ID ${this.selectedPatientId} with ${booked.doctorName}!`;
        this.isSubmitting = false;
        // Reset form
        this.doctorName = '';
        this.loadTodayAppointments();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to book appointment.';
        console.error(err);
      }
    });
  }

  startConsultation(appointment: Appointment): void {
    if (appointment.id) {
      this.router.navigate(['/consultation', appointment.id]);
    }
  }
}

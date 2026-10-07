import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  searchKeyword: string = '';

  // Form Model
  newPatient: Patient = {
    name: '',
    gender: 'Male',
    age: 0,
    phoneNumber: ''
  };

  // UI State
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load patients. Backend might be unreachable.';
        console.error(err);
      }
    });
  }

  onSearch(): void {
    this.patientService.searchPatients(this.searchKeyword).subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (err) => {
        this.errorMessage = 'Error searching patients.';
        console.error(err);
      }
    });
  }

  registerPatient(): void {
    this.successMessage = '';
    this.errorMessage = '';

    // Frontend Validations
    if (!this.newPatient.name || !this.newPatient.name.trim()) {
      this.errorMessage = 'Patient name is required.';
      return;
    }

    if (!this.newPatient.gender) {
      this.errorMessage = 'Gender is required.';
      return;
    }

    if (!this.newPatient.age || this.newPatient.age <= 0) {
      this.errorMessage = 'Age must be a positive number.';
      return;
    }

    if (!this.newPatient.phoneNumber || !this.newPatient.phoneNumber.trim()) {
      this.errorMessage = 'Phone number is required.';
      return;
    }

    this.isSubmitting = true;
    this.patientService.createPatient(this.newPatient).subscribe({
      next: (savedPatient) => {
        this.successMessage = `Patient ${savedPatient.name} (ID: ${savedPatient.id}) registered successfully!`;
        this.isSubmitting = false;
        // Reset form
        this.newPatient = {
          name: '',
          gender: 'Male',
          age: 0,
          phoneNumber: ''
        };
        this.loadPatients();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to register patient. Please check form details.';
        console.error(err);
      }
    });
  }

  bookAppointmentFor(patient: Patient): void {
    this.router.navigate(['/appointments'], { queryParams: { patientId: patient.id } });
  }
}

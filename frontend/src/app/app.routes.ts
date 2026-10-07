import { Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { ConsultationFormComponent } from './components/consultation-form/consultation-form.component';
import { ConsultationHistoryComponent } from './components/consultation-history/consultation-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientListComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'consultation/:appointmentId', component: ConsultationFormComponent },
  { path: 'consultation-history/:patientId', component: ConsultationHistoryComponent },
  { path: '**', redirectTo: 'patients' }
];

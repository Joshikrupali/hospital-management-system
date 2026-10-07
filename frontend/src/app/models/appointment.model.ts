import { Patient } from './patient.model';

export interface Appointment {
  id?: number;
  patient: Patient;
  doctorName: string;
  appointmentDateTime: string;
  status?: string;
}

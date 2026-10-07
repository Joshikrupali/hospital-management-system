import { Appointment } from './appointment.model';

export interface Consultation {
  id?: number;
  appointment: Appointment;
  temperature: string;
  bloodPressure: string;
  notes: string;
  status?: string;
  consultationDate?: string;
}

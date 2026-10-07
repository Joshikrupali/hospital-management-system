package com.opd.backend.service;

import com.opd.backend.entity.Appointment;
import com.opd.backend.entity.Patient;
import com.opd.backend.repository.AppointmentRepository;
import com.opd.backend.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }

    public Appointment bookAppointment(Appointment appointment) {
        if (appointment.getPatient() != null && appointment.getPatient().getId() != null) {
            Patient patient = patientRepository.findById(appointment.getPatient().getId())
                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + appointment.getPatient().getId()));
            appointment.setPatient(patient);
        }
        if (appointment.getStatus() == null || appointment.getStatus().trim().isEmpty()) {
            appointment.setStatus("BOOKED");
        }
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getTodayAppointments() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);
        return appointmentRepository.findByAppointmentDateTimeBetween(startOfDay, endOfDay);
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }
}

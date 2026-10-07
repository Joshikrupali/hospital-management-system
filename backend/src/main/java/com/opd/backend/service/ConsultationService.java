package com.opd.backend.service;

import com.opd.backend.entity.Appointment;
import com.opd.backend.entity.Consultation;
import com.opd.backend.repository.AppointmentRepository;
import com.opd.backend.repository.ConsultationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final AppointmentRepository appointmentRepository;

    public ConsultationService(ConsultationRepository consultationRepository, AppointmentRepository appointmentRepository) {
        this.consultationRepository = consultationRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @Transactional
    public Consultation saveConsultation(Consultation consultation) {
        if (consultation.getAppointment() == null || consultation.getAppointment().getId() == null) {
            throw new RuntimeException("Appointment ID is required for consultation");
        }

        Long appointmentId = consultation.getAppointment().getId();
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + appointmentId));

        // Update appointment status to COMPLETED
        appointment.setStatus("COMPLETED");
        appointmentRepository.save(appointment);

        consultation.setAppointment(appointment);
        consultation.setStatus("COMPLETED");
        if (consultation.getConsultationDate() == null) {
            consultation.setConsultationDate(LocalDateTime.now());
        }

        return consultationRepository.save(consultation);
    }

    public Consultation getConsultationById(Long id) {
        return consultationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultation not found with id: " + id));
    }

    public List<Consultation> getConsultationsByPatientId(Long patientId) {
        return consultationRepository.findByAppointmentPatientId(patientId);
    }

    public Consultation getConsultationByAppointmentId(Long appointmentId) {
        return consultationRepository.findByAppointmentId(appointmentId).orElse(null);
    }
}

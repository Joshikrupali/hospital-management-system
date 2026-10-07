package com.opd.backend.controller;

import com.opd.backend.entity.Consultation;
import com.opd.backend.service.ConsultationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "*")
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @PostMapping
    public ResponseEntity<Consultation> createConsultation(@RequestBody Consultation consultation) {
        Consultation savedConsultation = consultationService.saveConsultation(consultation);
        return new ResponseEntity<>(savedConsultation, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable Long id) {
        Consultation consultation = consultationService.getConsultationById(id);
        return ResponseEntity.ok(consultation);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Consultation>> getConsultationsByPatientId(@PathVariable Long patientId) {
        List<Consultation> consultations = consultationService.getConsultationsByPatientId(patientId);
        return ResponseEntity.ok(consultations);
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<Consultation> getConsultationByAppointmentId(@PathVariable Long appointmentId) {
        Consultation consultation = consultationService.getConsultationByAppointmentId(appointmentId);
        if (consultation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(consultation);
    }
}

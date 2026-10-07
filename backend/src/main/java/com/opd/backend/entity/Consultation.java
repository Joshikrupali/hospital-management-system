package com.opd.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultations")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @Column(nullable = false)
    private String temperature;

    @Column(name = "blood_pressure", nullable = false)
    private String bloodPressure;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false)
    private String status = "COMPLETED";

    @Column(name = "consultation_date")
    private LocalDateTime consultationDate;

    public Consultation() {
    }

    public Consultation(Long id, Appointment appointment, String temperature, String bloodPressure, String notes, String status, LocalDateTime consultationDate) {
        this.id = id;
        this.appointment = appointment;
        this.temperature = temperature;
        this.bloodPressure = bloodPressure;
        this.notes = notes;
        this.status = status;
        this.consultationDate = consultationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getConsultationDate() {
        return consultationDate;
    }

    public void setConsultationDate(LocalDateTime consultationDate) {
        this.consultationDate = consultationDate;
    }
}

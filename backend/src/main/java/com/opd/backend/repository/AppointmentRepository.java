package com.opd.backend.repository;

import com.opd.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByAppointmentDateTimeBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
    List<Appointment> findByPatientId(Long patientId);
}

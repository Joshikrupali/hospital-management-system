package com.opd.backend.controller;

import com.opd.backend.entity.Appointment;
import com.opd.backend.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        Appointment bookedAppointment = appointmentService.bookAppointment(appointment);
        return new ResponseEntity<>(bookedAppointment, HttpStatus.CREATED);
    }

    @GetMapping("/today")
    public ResponseEntity<List<Appointment>> getTodayAppointments() {
        List<Appointment> appointments = appointmentService.getTodayAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointment);
    }
}

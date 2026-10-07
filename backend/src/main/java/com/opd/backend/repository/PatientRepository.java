package com.opd.backend.repository;

import com.opd.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByNameContainingIgnoreCaseOrPhoneNumberContaining(String nameKeyword, String phoneKeyword);
}

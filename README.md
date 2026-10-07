# OPD Mini Module

A clean, full-stack **Outpatient Department (OPD) Mini Module** built with **Spring Boot (Java)** for the backend REST APIs, **MySQL** for relational persistence, and **Angular** for the frontend user interface.

---

## 🌟 Project Overview

The OPD Mini Module manages core outpatient clinic workflows end-to-end:
1. **Patient Registration & Search**: Register new patients with demographic details and search records by name or phone number.
2. **OPD Appointment Booking**: Schedule appointments by selecting from registered patients, specifying doctor name, appointment date, and time.
3. **Doctor Consultation Summary**: Conduct consultations, record clinical vitals (Temperature & Blood Pressure) along with notes, and automatically update appointment status from `BOOKED` to `COMPLETED`.
4. **Patient Consultation History**: View past completed consultations and clinical records for any patient.

---

## 🛠️ Technologies Used

### Frontend
- **Angular 19**
- **TypeScript**
- **HTML5**
- **Vanilla CSS (Design Tokens & Responsive Utility Classes)**
- **Angular HttpClient & Router**

### Backend
- **Java 17+ / Java 23**
- **Spring Boot 3.4**
- **Spring Web (REST APIs)**
- **Spring Data JPA (Hibernate ORM)**

### Database
- **MySQL 8.0+**

---

## 🏗️ Architecture

```
Angular (Port 4200)
    ↓  (HTTP / JSON REST APIs)
Spring Boot REST Controller (Port 8080)
    ↓
Spring Service Layer
    ↓
Spring Data JPA Repositories
    ↓
MySQL Database (opd_db)
```

---

## 📋 Prerequisites

Before running the application, ensure the following are installed:
- **Java JDK 17+** (e.g. OpenJDK / Oracle JDK 17, 21, or 23)
- **Maven** (or use the provided Maven Wrapper `./mvnw`)
- **Node.js v18+** & **npm**
- **Angular CLI** (`npm install -g @angular/cli`)
- **MySQL Server 8.0+**

---

## 🗄️ Database Setup (MySQL)

1. Open MySQL Command Line Client or MySQL Workbench:
```sql
CREATE DATABASE IF NOT EXISTS opd_db;
```

2. Configure backend database password in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/opd_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```
> **Note**: Replace `YOUR_MYSQL_PASSWORD` with your local MySQL server `root` password.

---

## 🚀 How to Run the Application

### 1. Run Backend (Spring Boot)

Navigate to the `backend` directory and run:

**On Windows (PowerShell):**
```powershell
cd backend
$env:JAVA_HOME="C:\Program Files\Java\jdk-23" # Adjust path to your local JDK directory
.\mvnw.cmd spring-boot:run
```

**On Linux/macOS:**
```bash
cd backend
./mvnw spring-boot:run
```

The Spring Boot backend will start on **`http://localhost:8080`**.

---

### 2. Run Frontend (Angular)

Open a new terminal window, navigate to the `frontend` directory, and run:

```bash
cd frontend
npm install
npm start
# or: npx ng serve
```

The Angular application will start on **`http://localhost:4200`**.

---

## 🔗 URLs & Access Points

| Service | URL |
| :--- | :--- |
| **Frontend Application** | `http://localhost:4200` |
| **Backend REST APIs Base** | `http://localhost:8080/api` |

---

## 📡 REST API Summary

### 1. Patient APIs
- `POST /api/patients` - Register a new patient
- `GET /api/patients` - Retrieve all registered patients
- `GET /api/patients/search?keyword={keyword}` - Search patients by name or phone number
- `GET /api/patients/{id}` - Retrieve patient details by ID

### 2. Appointment APIs
- `POST /api/appointments` - Book a new OPD appointment
- `GET /api/appointments/today` - Retrieve all appointments scheduled for today
- `GET /api/appointments/{id}` - Retrieve appointment details by ID

### 3. Consultation APIs
- `POST /api/consultations` - Submit doctor consultation summary (marks appointment as `COMPLETED`)
- `GET /api/consultations/{id}` - Retrieve consultation details by ID
- `GET /api/consultations/patient/{patientId}` - Retrieve completed consultation history for a patient
- `GET /api/consultations/appointment/{appointmentId}` - Retrieve consultation record for an appointment

---

## 🧪 Complete End-to-End Demo Flow

Follow this step-by-step verification flow:

### STEP 1: Patient Registration
1. Open `http://localhost:4200` (defaults to Patients tab).
2. Fill out the **Register New Patient** form:
   - **Name**: Rahul Sharma
   - **Gender**: Male
   - **Age**: 30
   - **Phone Number**: 9876543210
3. Click **Save / Register Patient**.
4. The patient is saved in MySQL and appears immediately in the **Registered Patients** table.

### STEP 2: Appointment Booking
1. Click **Book Appointment** next to Rahul Sharma (or navigate to **Appointments** tab).
2. Select **Rahul Sharma** from the **Select Patient** dropdown.
3. Fill in details:
   - **Doctor Name**: Dr. Amit Patel
   - **Appointment Date**: Today's Date
   - **Appointment Time**: Current Time
4. Click **Book Appointment**.
5. The appointment is created with status **`BOOKED`**.

### STEP 3: Today's Appointment Queue & Consultation
1. Under **Today's OPD Appointments List**, observe the newly created appointment.
2. Click the **Consult** button on the row.
3. The Consultation Screen opens with patient information displayed.

### STEP 4: Submit Doctor Consultation Summary
1. Fill in vitals and clinical notes:
   - **Temperature**: `98.6` °F
   - **Blood Pressure**: `120/80` mmHg
   - **Short Notes**: `Patient is stable. Prescribed Paracetamol 500mg as needed.`
2. Click **Complete Consultation**.
3. The consultation is saved, and the appointment status automatically transitions from **`BOOKED` → `COMPLETED`**.

### STEP 5: View Consultation History
1. Navigate back to **Patients** tab or click **View Patient Consultation History**.
2. Click **History** next to Rahul Sharma.
3. The completed consultation record with temperature, blood pressure, notes, doctor name, and date appears in the history table.

---

## 📂 Project Structure

```
OPD Full stack/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/opd/backend/
│       │   ├── OpdApplication.java
│       │   ├── config/
│       │   │   ├── GlobalExceptionHandler.java
│       │   │   └── WebConfig.java
│       │   ├── controller/
│       │   │   ├── PatientController.java
│       │   │   ├── AppointmentController.java
│       │   │   └── ConsultationController.java
│       │   ├── entity/
│       │   │   ├── Patient.java
│       │   │   ├── Appointment.java
│       │   │   └── Consultation.java
│       │   ├── repository/
│       │   │   ├── PatientRepository.java
│       │   │   ├── AppointmentRepository.java
│       │   │   └── ConsultationRepository.java
│       │   └── service/
│       │       ├── PatientService.java
│       │       ├── AppointmentService.java
│       │       └── ConsultationService.java
│       └── resources/
│           └── application.properties
│
├── frontend/
│   ├── package.json
│   ├── angular.json
│   └── src/
│       ├── main.ts
│       ├── styles.css
│       ├── environments/
│       │   └── environment.ts
│       └── app/
│           ├── app.component.ts
│           ├── app.component.html
│           ├── app.config.ts
│           ├── app.routes.ts
│           ├── components/
│           │   ├── patient-list/
│           │   ├── appointment-list/
│           │   ├── consultation-form/
│           │   └── consultation-history/
│           ├── models/
│           │   ├── patient.model.ts
│           │   ├── appointment.model.ts
│           │   └── consultation.model.ts
│           └── services/
│               ├── patient.service.ts
│               ├── appointment.service.ts
│               └── consultation.service.ts
└── README.md
```

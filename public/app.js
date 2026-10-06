let doctors = [];
let patients = [];
let schedules = [];
let appointments = [];


// ======================================
// LOGIN
// ======================================

async function login() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const response =
        await fetch("/api/login", {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        });

    const data =
        await response.json();

    if (!response.ok) {

        document.getElementById(
            "loginMessage"
        ).textContent =
            data.message;

        return;
    }

    sessionStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

    showDashboard();
}


// ======================================
// REGISTER
// ======================================

async function registerPatient() {

    const data = {

        name:
            document.getElementById(
                "regName"
            ).value,

        email:
            document.getElementById(
                "regEmail"
            ).value,

        password:
            document.getElementById(
                "regPassword"
            ).value,

        phone:
            document.getElementById(
                "regPhone"
            ).value,

        age:
            document.getElementById(
                "regAge"
            ).value,

        gender:
            document.getElementById(
                "regGender"
            ).value,

        address:
            document.getElementById(
                "regAddress"
            ).value,

        blood_group:
            document.getElementById(
                "regBlood"
            ).value
    };

    const response =
        await fetch("/api/register", {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(data)
        });

    const result =
        await response.json();

    document.getElementById(
        "registerMessage"
    ).textContent =
        result.message ||
        result.error;
}


// ======================================
// SHOW LOGIN
// ======================================

function showLogin() {

    document.getElementById(
        "loginForm"
    ).classList.remove("hidden");

    document.getElementById(
        "registerForm"
    ).classList.add("hidden");
}


// ======================================
// SHOW REGISTER
// ======================================

function showRegister() {

    document.getElementById(
        "loginForm"
    ).classList.add("hidden");

    document.getElementById(
        "registerForm"
    ).classList.remove("hidden");
}


// ======================================
// DASHBOARD
// ======================================

function showDashboard() {

    const user =
        JSON.parse(
            sessionStorage.getItem("user")
        );

    if (!user) {
        return;
    }

    document.getElementById(
        "authPage"
    ).classList.add("hidden");

    document.getElementById(
        "dashboardPage"
    ).classList.remove("hidden");

    document.getElementById(
        "welcome"
    ).textContent =
        `Welcome, ${user.name} (${user.role})`;

    loadDashboard();
}


// ======================================
// LOGOUT
// ======================================

function logout() {

    sessionStorage.removeItem("user");

    location.reload();
}


// ======================================
// LOAD DASHBOARD
// ======================================

async function loadDashboard() {

    await loadStats();
    await loadPatients();
    await loadDoctors();
    await loadSchedules();
    await loadAppointments();
}


// ======================================
// STATS
// ======================================

async function loadStats() {

    const response =
        await fetch("/api/stats");

    const data =
        await response.json();

    document.getElementById(
        "patientCount"
    ).textContent =
        data.patients;

    document.getElementById(
        "doctorCount"
    ).textContent =
        data.doctors;

    document.getElementById(
        "appointmentCount"
    ).textContent =
        data.appointments;

    document.getElementById(
        "slotCount"
    ).textContent =
        data.availableSlots;
}


// ======================================
// PATIENTS
// ======================================

async function loadPatients() {

    const response =
        await fetch("/api/patients");

    patients =
        await response.json();

    const select =
        document.getElementById(
            "patientSelect"
        );

    select.innerHTML =
        `<option value="">
            Select Patient
        </option>`;

    patients.forEach(patient => {

        select.innerHTML += `
            <option value="${patient._id}">
                ${patient.patient_name}
            </option>
        `;
    });
}


// ======================================
// DOCTORS
// ======================================

async function loadDoctors() {

    const response =
        await fetch("/api/doctors");

    doctors =
        await response.json();

    const select =
        document.getElementById(
            "doctorSelect"
        );

    select.innerHTML =
        `<option value="">
            Select Doctor
        </option>`;

    doctors.forEach(doctor => {

        select.innerHTML += `
            <option value="${doctor._id}">
                ${doctor.doctor_name}
            </option>
        `;
    });

    const table =
        document.getElementById(
            "doctorTable"
        );

    table.innerHTML = "";

    doctors.forEach(doctor => {

        table.innerHTML += `
            <tr>
                <td>${doctor._id}</td>
                <td>${doctor.doctor_name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.department_id}</td>
                <td>${doctor.experience}</td>
                <td>₹${doctor.consultation_fee}</td>
            </tr>
        `;
    });
}


// ======================================
// FILTER SCHEDULES
// ======================================

function filterSchedules() {

    const doctorId =
        document.getElementById(
            "doctorSelect"
        ).value;

    const select =
        document.getElementById(
            "scheduleSelect"
        );

    select.innerHTML =
        `<option value="">
            Select Available Schedule
        </option>`;

    schedules
        .filter(
            schedule =>
                schedule.slot_status ===
                    "Available" &&
                schedule.doctor_id ===
                    doctorId
        )
        .forEach(schedule => {

            select.innerHTML += `
                <option value="${schedule._id}">
                    ${schedule.date}
                    -
                    ${schedule.start_time}
                </option>
            `;
        });
}


// ======================================
// SCHEDULES
// ======================================

async function loadSchedules() {

    const response =
        await fetch("/api/schedules");

    schedules =
        await response.json();

    filterSchedules();
}


// ======================================
// APPOINTMENTS
// ======================================

async function loadAppointments() {

    const response =
        await fetch("/api/appointments");

    appointments =
        await response.json();

    const table =
        document.getElementById(
            "appointmentTable"
        );

    table.innerHTML = "";

    appointments.forEach(appointment => {

        const patient =
            appointment.patient?.[0];

        const doctor =
            appointment.doctor?.[0];

        table.innerHTML += `
            <tr>

                <td>
                    ${appointment._id}
                </td>

                <td>
                    ${
                        patient
                            ? patient.patient_name
                            : appointment.patient_id
                    }
                </td>

                <td>
                    ${
                        doctor
                            ? doctor.doctor_name
                            : appointment.doctor_id
                    }
                </td>

                <td>
                    ${appointment.appointment_date}
                </td>

                <td>
                    ${appointment.appointment_time}
                </td>

                <td>
                    ${appointment.status}
                </td>

                <td>

                    <button
                        onclick="cancelAppointment('${appointment._id}')"
                    >
                        Cancel
                    </button>

                </td>

            </tr>
        `;
    });
}


// ======================================
// BOOK APPOINTMENT
// ======================================

async function bookAppointment() {

    const patient_id =
        document.getElementById(
            "patientSelect"
        ).value;

    const doctor_id =
        document.getElementById(
            "doctorSelect"
        ).value;

    const schedule_id =
        document.getElementById(
            "scheduleSelect"
        ).value;

    const reason =
        document.getElementById(
            "reason"
        ).value;

    if (
        !patient_id ||
        !doctor_id ||
        !schedule_id
    ) {

        document.getElementById(
            "bookingMessage"
        ).textContent =
            "Please select patient, doctor and schedule.";

        return;
    }

    const schedule =
        schedules.find(
            item =>
                item._id === schedule_id
        );

    const doctor =
        doctors.find(
            item =>
                item._id === doctor_id
        );

    const appointment = {

        _id:
            "A" + Date.now(),

        patient_id,

        doctor_id,

        department_id:
            doctor.department_id,

        schedule_id,

        appointment_date:
            schedule.date,

        appointment_time:
            schedule.start_time,

        reason:
            reason ||
            "General consultation",

        status:
            "Booked",

        created_at:
            new Date()
                .toISOString()
                .split("T")[0]
    };

    const response =
        await fetch(
            "/api/appointments",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        appointment
                    )
            }
        );

    const data =
        await response.json();

    document.getElementById(
        "bookingMessage"
    ).textContent =
        data.message;

    if (response.ok) {

        document.getElementById(
            "reason"
        ).value = "";

        await loadDashboard();
    }
}


// ======================================
// CANCEL APPOINTMENT
// ======================================

async function cancelAppointment(id) {

    const confirmCancel =
        confirm(
            "Cancel this appointment?"
        );

    if (!confirmCancel) {
        return;
    }

    const response =
        await fetch(
            `/api/appointments/${id}`,
            {
                method: "DELETE"
            }
        );

    const data =
        await response.json();

    alert(data.message);

    await loadDashboard();
}


// ======================================
// CHECK EXISTING LOGIN
// ======================================

const existingUser =
    sessionStorage.getItem("user");

if (existingUser) {
    showDashboard();
}
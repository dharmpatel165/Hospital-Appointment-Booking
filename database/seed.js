const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function seedDatabase() {
    try {
        await client.connect();

        const db = client.db(process.env.DB_NAME);

        // Clear previous data
        await db.collection("users").deleteMany({});
        await db.collection("patients").deleteMany({});
        await db.collection("doctors").deleteMany({});
        await db.collection("departments").deleteMany({});
        await db.collection("appointments").deleteMany({});
        await db.collection("schedules").deleteMany({});

        const passwordHash = await bcrypt.hash("1234", 10);

        // =========================
        // USERS - 19
        // =========================

        const users = [
            {
                _id: "U001",
                name: "Rahul Sharma",
                email: "rahul@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543210"
            },
            {
                _id: "U002",
                name: "Aarav Patel",
                email: "aarav@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543211"
            },
            {
                _id: "U003",
                name: "Riya Shah",
                email: "riya@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543212"
            },
            {
                _id: "U004",
                name: "Neha Singh",
                email: "neha@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543213"
            },
            {
                _id: "U005",
                name: "Simran Kapoor",
                email: "simran@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543214"
            },
            {
                _id: "U006",
                name: "Manish Kumar",
                email: "manish@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543215"
            },
            {
                _id: "U007",
                name: "Priya Nair",
                email: "priya@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543216"
            },
            {
                _id: "U008",
                name: "Rohan Das",
                email: "rohan@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543217"
            },
            {
                _id: "U009",
                name: "Isha Gupta",
                email: "isha@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543218"
            },
            {
                _id: "U010",
                name: "Aditya Joshi",
                email: "aditya@example.com",
                password: passwordHash,
                role: "patient",
                phone: "9876543219"
            },
            {
                _id: "U011",
                name: "Dr. Ananya Mehta",
                email: "ananya@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543220"
            },
            {
                _id: "U012",
                name: "Dr. Vikram Rao",
                email: "vikram@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543221"
            },
            {
                _id: "U013",
                name: "Dr. Karan Verma",
                email: "karan@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543222"
            },
            {
                _id: "U014",
                name: "Dr. Arjun Rao",
                email: "arjun@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543223"
            },
            {
                _id: "U015",
                name: "Dr. Meera Shah",
                email: "meera@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543224"
            },
            {
                _id: "U016",
                name: "Dr. Rohit Kumar",
                email: "rohit@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543225"
            },
            {
                _id: "U017",
                name: "Dr. Priya Menon",
                email: "priya.m@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543226"
            },
            {
                _id: "U018",
                name: "Dr. Suresh Iyer",
                email: "suresh@example.com",
                password: passwordHash,
                role: "doctor",
                phone: "9876543227"
            },
            {
                _id: "U019",
                name: "Hospital Admin",
                email: "admin@hospital.com",
                password: passwordHash,
                role: "admin",
                phone: "9876543228"
            }
        ];

        // =========================
        // DEPARTMENTS - 6
        // =========================

        const departments = [
            {
                _id: "D001",
                department_name: "Cardiology",
                description: "Diagnosis and treatment of heart-related conditions",
                location: "Block A, First Floor"
            },
            {
                _id: "D002",
                department_name: "Neurology",
                description: "Diagnosis and treatment of nervous system disorders",
                location: "Block B, First Floor"
            },
            {
                _id: "D003",
                department_name: "Orthopedics",
                description: "Treatment of bone and joint conditions",
                location: "Block C, First Floor"
            },
            {
                _id: "D004",
                department_name: "Dermatology",
                description: "Diagnosis and treatment of skin conditions",
                location: "Block D, First Floor"
            },
            {
                _id: "D005",
                department_name: "General Medicine",
                description: "General medical consultation",
                location: "Block E, First Floor"
            },
            {
                _id: "D006",
                department_name: "Pediatrics",
                description: "Medical care for children",
                location: "Block F, First Floor"
            }
        ];

        // =========================
        // PATIENTS - 10
        // =========================

        const patients = [
            {
                _id: "P001",
                user_id: "U001",
                patient_name: "Rahul Sharma",
                age: 22,
                gender: "Male",
                phone: "9876543210",
                address: "Delhi",
                blood_group: "B+",
                created_at: "2026-10-01"
            },
            {
                _id: "P002",
                user_id: "U002",
                patient_name: "Aarav Patel",
                age: 25,
                gender: "Male",
                phone: "9876543211",
                address: "Mumbai",
                blood_group: "O+",
                created_at: "2026-10-01"
            },
            {
                _id: "P003",
                user_id: "U003",
                patient_name: "Riya Shah",
                age: 21,
                gender: "Female",
                phone: "9876543212",
                address: "Ahmedabad",
                blood_group: "A+",
                created_at: "2026-10-01"
            },
            {
                _id: "P004",
                user_id: "U004",
                patient_name: "Neha Singh",
                age: 30,
                gender: "Female",
                phone: "9876543213",
                address: "Chennai",
                blood_group: "O+",
                created_at: "2026-10-01"
            },
            {
                _id: "P005",
                user_id: "U005",
                patient_name: "Simran Kapoor",
                age: 28,
                gender: "Female",
                phone: "9876543214",
                address: "Pune",
                blood_group: "AB+",
                created_at: "2026-10-01"
            },
            {
                _id: "P006",
                user_id: "U006",
                patient_name: "Manish Kumar",
                age: 35,
                gender: "Male",
                phone: "9876543215",
                address: "Noida",
                blood_group: "B+",
                created_at: "2026-10-01"
            },
            {
                _id: "P007",
                user_id: "U007",
                patient_name: "Priya Nair",
                age: 27,
                gender: "Female",
                phone: "9876543216",
                address: "Kochi",
                blood_group: "A-",
                created_at: "2026-10-01"
            },
            {
                _id: "P008",
                user_id: "U008",
                patient_name: "Rohan Das",
                age: 40,
                gender: "Male",
                phone: "9876543217",
                address: "Kolkata",
                blood_group: "O-",
                created_at: "2026-10-01"
            },
            {
                _id: "P009",
                user_id: "U009",
                patient_name: "Isha Gupta",
                age: 19,
                gender: "Female",
                phone: "9876543218",
                address: "Jaipur",
                blood_group: "B-",
                created_at: "2026-10-01"
            },
            {
                _id: "P010",
                user_id: "U010",
                patient_name: "Aditya Joshi",
                age: 45,
                gender: "Male",
                phone: "9876543219",
                address: "Surat",
                blood_group: "AB-",
                created_at: "2026-10-01"
            }
        ];

        // =========================
        // DOCTORS - 8
        // =========================

        const doctors = [
            {
                _id: "DOC001",
                user_id: "U011",
                doctor_name: "Dr. Ananya Mehta",
                specialization: "Cardiologist",
                department_id: "D001",
                phone: "9876543220",
                experience: 8,
                consultation_fee: 800
            },
            {
                _id: "DOC002",
                user_id: "U012",
                doctor_name: "Dr. Vikram Rao",
                specialization: "Neurologist",
                department_id: "D002",
                phone: "9876543221",
                experience: 10,
                consultation_fee: 900
            },
            {
                _id: "DOC003",
                user_id: "U013",
                doctor_name: "Dr. Karan Verma",
                specialization: "Orthopedic",
                department_id: "D003",
                phone: "9876543222",
                experience: 7,
                consultation_fee: 700
            },
            {
                _id: "DOC004",
                user_id: "U014",
                doctor_name: "Dr. Arjun Rao",
                specialization: "Dermatologist",
                department_id: "D004",
                phone: "9876543223",
                experience: 6,
                consultation_fee: 600
            },
            {
                _id: "DOC005",
                user_id: "U015",
                doctor_name: "Dr. Meera Shah",
                specialization: "General Physician",
                department_id: "D005",
                phone: "9876543224",
                experience: 9,
                consultation_fee: 500
            },
            {
                _id: "DOC006",
                user_id: "U016",
                doctor_name: "Dr. Rohit Kumar",
                specialization: "Pediatrician",
                department_id: "D006",
                phone: "9876543225",
                experience: 5,
                consultation_fee: 650
            },
            {
                _id: "DOC007",
                user_id: "U017",
                doctor_name: "Dr. Priya Menon",
                specialization: "Cardiologist",
                department_id: "D001",
                phone: "9876543226",
                experience: 11,
                consultation_fee: 850
            },
            {
                _id: "DOC008",
                user_id: "U018",
                doctor_name: "Dr. Suresh Iyer",
                specialization: "General Physician",
                department_id: "D005",
                phone: "9876543227",
                experience: 12,
                consultation_fee: 550
            }
        ];

        // =========================
        // SCHEDULES - 15
        // =========================

        const schedules = [];

        for (let i = 1; i <= 15; i++) {

            const doctorNumber = ((i - 1) % 8) + 1;

            schedules.push({
                _id: `S${String(i).padStart(3, "0")}`,
                doctor_id:
                    `DOC${String(doctorNumber).padStart(3, "0")}`,
                date:
                    `2026-10-${String(10 + i).padStart(2, "0")}`,
                start_time:
                    i % 2 === 0 ? "11:00" : "10:00",
                end_time:
                    i % 2 === 0 ? "11:30" : "10:30",
                slot_status:
                    i <= 10 ? "Booked" : "Available"
            });
        }

        // =========================
        // APPOINTMENTS - 10
        // =========================

        const appointments = [];

        for (let i = 1; i <= 10; i++) {

            const doctorNumber = ((i - 1) % 8) + 1;
            const doctor = doctors[doctorNumber - 1];

            appointments.push({
                _id:
                    `A${String(i).padStart(3, "0")}`,

                patient_id:
                    `P${String(i).padStart(3, "0")}`,

                doctor_id:
                    `DOC${String(doctorNumber).padStart(3, "0")}`,

                department_id:
                    doctor.department_id,

                schedule_id:
                    `S${String(i).padStart(3, "0")}`,

                appointment_date:
                    `2026-10-${String(10 + i).padStart(2, "0")}`,

                appointment_time:
                    i % 2 === 0 ? "11:00" : "10:00",

                reason:
                    "Regular check-up",

                status:
                    i % 5 === 0
                        ? "Completed"
                        : "Booked",

                created_at:
                    "2026-10-01"
            });
        }

        await db.collection("users").insertMany(users);
        await db.collection("patients").insertMany(patients);
        await db.collection("doctors").insertMany(doctors);
        await db.collection("departments").insertMany(departments);
        await db.collection("schedules").insertMany(schedules);
        await db.collection("appointments").insertMany(appointments);

        console.log("================================");
        console.log("DATABASE SEEDED SUCCESSFULLY");
        console.log("================================");
        console.log("Users:", users.length);
        console.log("Patients:", patients.length);
        console.log("Doctors:", doctors.length);
        console.log("Departments:", departments.length);
        console.log("Schedules:", schedules.length);
        console.log("Appointments:", appointments.length);
        console.log("TOTAL RECORDS:", 68);
        console.log("================================");

    } catch (error) {

        console.error("Seed error:", error);

    } finally {

        await client.close();
    }
}

seedDatabase();
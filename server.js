const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client =
    new MongoClient(process.env.MONGO_URI);

let db;


// ======================================
// DATABASE CONNECTION
// ======================================

async function connectDatabase() {

    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log(
        "MongoDB connected successfully."
    );
}


// ======================================
// LOGIN
// ======================================

app.post("/api/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await db.collection("users").findOne({
                email: email
            });

        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ======================================
// REGISTER PATIENT
// ======================================

app.post("/api/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone,
            age,
            gender,
            address,
            blood_group
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !phone
        ) {

            return res.status(400).json({
                message:
                    "Name, email, password and phone are required."
            });
        }

        const existingUser =
            await db.collection("users").findOne({
                email: email
            });

        if (existingUser) {

            return res.status(409).json({
                message:
                    "Email already registered."
            });
        }

        const lastUser =
            await db.collection("users")
                .find()
                .sort({ _id: -1 })
                .limit(1)
                .toArray();

        const userNumber =
            lastUser.length > 0
                ? parseInt(
                    lastUser[0]._id.substring(1)
                ) + 1
                : 1;

        const userId =
            `U${String(userNumber).padStart(3, "0")}`;

        const lastPatient =
            await db.collection("patients")
                .find()
                .sort({ _id: -1 })
                .limit(1)
                .toArray();

        const patientNumber =
            lastPatient.length > 0
                ? parseInt(
                    lastPatient[0]._id.substring(1)
                ) + 1
                : 1;

        const patientId =
            `P${String(patientNumber).padStart(3, "0")}`;

        const passwordHash =
            await bcrypt.hash(password, 10);

        await db.collection("users").insertOne({
            _id: userId,
            name,
            email,
            password: passwordHash,
            role: "patient",
            phone
        });

        await db.collection("patients").insertOne({
            _id: patientId,
            user_id: userId,
            patient_name: name,
            age: Number(age) || 0,
            gender: gender || "",
            phone,
            address: address || "",
            blood_group: blood_group || "",
            created_at:
                new Date()
                    .toISOString()
                    .split("T")[0]
        });

        res.status(201).json({
            message:
                "Patient registered successfully."
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ======================================
// DASHBOARD STATS
// ======================================

app.get("/api/stats", async (req, res) => {

    try {

        const patients =
            await db.collection("patients")
                .countDocuments();

        const doctors =
            await db.collection("doctors")
                .countDocuments();

        const appointments =
            await db.collection("appointments")
                .countDocuments();

        const availableSlots =
            await db.collection("schedules")
                .countDocuments({
                    slot_status: "Available"
                });

        res.json({
            patients,
            doctors,
            appointments,
            availableSlots
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ======================================
// PATIENTS
// ======================================

app.get("/api/patients", async (req, res) => {

    try {

        const patients =
            await db.collection("patients")
                .find()
                .toArray();

        res.json(patients);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


app.post("/api/patients", async (req, res) => {

    try {

        await db.collection("patients")
            .insertOne(req.body);

        res.status(201).json({
            message:
                "Patient created successfully."
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


app.put("/api/patients/:id", async (req, res) => {

    try {

        await db.collection("patients")
            .updateOne(
                { _id: req.params.id },
                { $set: req.body }
            );

        res.json({
            message:
                "Patient updated successfully."
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


app.delete("/api/patients/:id", async (req, res) => {

    try {

        await db.collection("patients")
            .deleteOne({
                _id: req.params.id
            });

        res.json({
            message:
                "Patient deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ======================================
// DOCTORS
// ======================================

app.get("/api/doctors", async (req, res) => {

    try {

        const doctors =
            await db.collection("doctors")
                .find()
                .toArray();

        res.json(doctors);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ======================================
// DEPARTMENTS
// ======================================

app.get(
    "/api/departments",
    async (req, res) => {

        try {

            const departments =
                await db.collection("departments")
                    .find()
                    .toArray();

            res.json(departments);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);


// ======================================
// SCHEDULES
// ======================================

app.get("/api/schedules", async (req, res) => {

    try {

        const schedules =
            await db.collection("schedules")
                .find()
                .toArray();

        res.json(schedules);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});


// ======================================
// APPOINTMENTS - READ + REFERENCES
// ======================================

app.get(
    "/api/appointments",
    async (req, res) => {

        try {

            const appointments =
                await db.collection("appointments")
                    .aggregate([

                        {
                            $lookup: {
                                from: "patients",
                                localField: "patient_id",
                                foreignField: "_id",
                                as: "patient"
                            }
                        },

                        {
                            $lookup: {
                                from: "doctors",
                                localField: "doctor_id",
                                foreignField: "_id",
                                as: "doctor"
                            }
                        },

                        {
                            $lookup: {
                                from: "departments",
                                localField: "department_id",
                                foreignField: "_id",
                                as: "department"
                            }
                        }

                    ])
                    .toArray();

            res.json(appointments);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);


// ======================================
// APPOINTMENT - CREATE
// ======================================

app.post(
    "/api/appointments",
    async (req, res) => {

        try {

            const appointment = req.body;

            const conflict =
                await db.collection(
                    "appointments"
                ).findOne({

                    doctor_id:
                        appointment.doctor_id,

                    appointment_date:
                        appointment.appointment_date,

                    appointment_time:
                        appointment.appointment_time,

                    status: {
                        $in: [
                            "Booked",
                            "Rescheduled"
                        ]
                    }
                });

            if (conflict) {

                return res.status(409).json({
                    message:
                        "This doctor and time slot is already booked."
                });
            }

            const schedule =
                await db.collection("schedules")
                    .findOne({

                        _id:
                            appointment.schedule_id,

                        doctor_id:
                            appointment.doctor_id,

                        date:
                            appointment.appointment_date,

                        slot_status:
                            "Available"
                    });

            if (!schedule) {

                return res.status(400).json({
                    message:
                        "The selected schedule is not available."
                });
            }

            await db.collection(
                "appointments"
            ).insertOne(appointment);

            await db.collection(
                "schedules"
            ).updateOne(
                {
                    _id:
                        appointment.schedule_id
                },
                {
                    $set: {
                        slot_status:
                            "Booked"
                    }
                }
            );

            res.status(201).json({
                message:
                    "Appointment booked successfully."
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);


// ======================================
// APPOINTMENT - UPDATE
// ======================================

app.put(
    "/api/appointments/:id",
    async (req, res) => {

        try {

            await db.collection(
                "appointments"
            ).updateOne(
                {
                    _id:
                        req.params.id
                },
                {
                    $set:
                        req.body
                }
            );

            res.json({
                message:
                    "Appointment updated successfully."
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);


// ======================================
// APPOINTMENT - DELETE
// ======================================

app.delete(
    "/api/appointments/:id",
    async (req, res) => {

        try {

            const appointment =
                await db.collection(
                    "appointments"
                ).findOne({
                    _id:
                        req.params.id
                });

            if (!appointment) {

                return res.status(404).json({
                    message:
                        "Appointment not found."
                });
            }

            await db.collection(
                "appointments"
            ).deleteOne({
                _id:
                    req.params.id
            });

            await db.collection(
                "schedules"
            ).updateOne(
                {
                    _id:
                        appointment.schedule_id
                },
                {
                    $set: {
                        slot_status:
                            "Available"
                    }
                }
            );

            res.json({
                message:
                    "Appointment cancelled successfully."
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });
        }
    }
);


// ======================================
// HOME PAGE
// ======================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );
});


// ======================================
// START SERVER
// ======================================

connectDatabase()
    .then(() => {

        app.listen(
            process.env.PORT,
            () => {

                console.log(
                    `Server running at http://localhost:${process.env.PORT}`
                );
            }
        );

    })
    .catch(error => {

        console.error(
            "MongoDB connection failed:",
            error
        );
    });
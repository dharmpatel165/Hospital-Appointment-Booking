const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function aggregationDemo() {

    try {

        await client.connect();

        const db = client.db(process.env.DB_NAME);

        // 1. Appointments per doctor
        const byDoctor =
            await db.collection("appointments")
                .aggregate([
                    {
                        $group: {
                            _id: "$doctor_id",
                            total_appointments: {
                                $sum: 1
                            }
                        }
                    }
                ])
                .toArray();

        console.log("\n1. APPOINTMENTS PER DOCTOR");
        console.log(byDoctor);

        // 2. Appointments per department
        const byDepartment =
            await db.collection("appointments")
                .aggregate([
                    {
                        $group: {
                            _id: "$department_id",
                            total_appointments: {
                                $sum: 1
                            }
                        }
                    }
                ])
                .toArray();

        console.log("\n2. APPOINTMENTS PER DEPARTMENT");
        console.log(byDepartment);

        // 3. Appointment status
        const byStatus =
            await db.collection("appointments")
                .aggregate([
                    {
                        $group: {
                            _id: "$status",
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ])
                .toArray();

        console.log("\n3. APPOINTMENT STATUS");
        console.log(byStatus);

        // 4. Daily appointment count
        const dailyCount =
            await db.collection("appointments")
                .aggregate([
                    {
                        $group: {
                            _id: "$appointment_date",
                            total_appointments: {
                                $sum: 1
                            }
                        }
                    },
                    {
                        $sort: {
                            _id: 1
                        }
                    }
                ])
                .toArray();

        console.log("\n4. DAILY APPOINTMENT COUNT");
        console.log(dailyCount);

        // 5. Appointments per patient
        const byPatient =
            await db.collection("appointments")
                .aggregate([
                    {
                        $group: {
                            _id: "$patient_id",
                            total_appointments: {
                                $sum: 1
                            }
                        }
                    }
                ])
                .toArray();

        console.log("\n5. APPOINTMENTS PER PATIENT");
        console.log(byPatient);

        console.log(
            "\nAll aggregation queries completed."
        );

    } catch (error) {

        console.error(
            "Aggregation error:",
            error
        );

    } finally {

        await client.close();
    }
}

aggregationDemo();
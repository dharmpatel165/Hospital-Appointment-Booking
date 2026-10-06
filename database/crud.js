const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function crudDemo() {

    try {

        await client.connect();

        const db = client.db(process.env.DB_NAME);

        // CREATE
        await db.collection("appointments").insertOne({
            _id: "ATEST",
            patient_id: "P001",
            doctor_id: "DOC001",
            department_id: "D001",
            schedule_id: "S011",
            appointment_date: "2026-10-25",
            appointment_time: "10:00",
            reason: "CRUD demonstration",
            status: "Booked",
            created_at: "2026-10-06"
        });

        console.log("CREATE completed.");

        // READ
        const appointment =
            await db.collection("appointments").findOne({
                _id: "ATEST"
            });

        console.log("READ result:");
        console.log(appointment);

        // UPDATE
        await db.collection("appointments").updateOne(
            { _id: "ATEST" },
            {
                $set: {
                    status: "Completed"
                }
            }
        );

        console.log("UPDATE completed.");

        // DELETE
        await db.collection("appointments").deleteOne({
            _id: "ATEST"
        });

        console.log("DELETE completed.");

        console.log(
            "All CRUD operations completed successfully."
        );

    } catch (error) {

        console.error("CRUD error:", error);

    } finally {

        await client.close();
    }
}

crudDemo();
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function createIndexes() {

    try {

        await client.connect();

        const db = client.db(process.env.DB_NAME);

        await db.collection("users").createIndex(
            { email: 1 },
            { unique: true }
        );

        await db.collection("patients").createIndex({
            user_id: 1
        });

        await db.collection("doctors").createIndex({
            department_id: 1
        });

        await db.collection("appointments").createIndex({
            patient_id: 1
        });

        await db.collection("appointments").createIndex({
            doctor_id: 1
        });

        await db.collection("appointments").createIndex({
            department_id: 1
        });

        await db.collection("appointments").createIndex({
            appointment_date: 1
        });

        await db.collection("appointments").createIndex({
            status: 1
        });

        await db.collection("appointments").createIndex({
            doctor_id: 1,
            appointment_date: 1,
            appointment_time: 1
        });

        console.log(
            "All indexes created successfully."
        );

    } catch (error) {

        console.error(
            "Index error:",
            error
        );

    } finally {

        await client.close();
    }
}

createIndexes();
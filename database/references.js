const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function referenceDemo() {

    try {

        await client.connect();

        const db = client.db(process.env.DB_NAME);

        const results =
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
                    },

                    {
                        $lookup: {
                            from: "schedules",
                            localField: "schedule_id",
                            foreignField: "_id",
                            as: "schedule"
                        }
                    }

                ])
                .toArray();

        console.log(
            JSON.stringify(results, null, 2)
        );

    } catch (error) {

        console.error(
            "Reference error:",
            error
        );

    } finally {

        await client.close();
    }
}

referenceDemo();
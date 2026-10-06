const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function setupDatabase() {
    try {
        await client.connect();

        const db = client.db(process.env.DB_NAME);

        const collections = [
            "users",
            "patients",
            "doctors",
            "departments",
            "appointments",
            "schedules"
        ];

        const existing =
            await db.listCollections().toArray();

        const existingNames =
            existing.map(c => c.name);

        for (const collection of collections) {

            if (!existingNames.includes(collection)) {
                await db.createCollection(collection);
                console.log(`Created: ${collection}`);
            }
        }

        console.log("Database setup completed successfully.");

    } catch (error) {
        console.error("Setup error:", error);
    } finally {
        await client.close();
    }
}

setupDatabase();
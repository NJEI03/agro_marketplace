import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false, // Disable query logging
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Stop the app if the database fails
    }
};

export { sequelize, connectDB };

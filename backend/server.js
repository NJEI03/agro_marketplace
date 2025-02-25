import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize,connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve images
app.use("/api/auth", authRoutes);

// Testing database connection
connectDB()

// Sync Database
sequelize.sync({ alter: true }) // Sync models with DB
  .then(() => console.log("✅ Database & User model synced"))
  .catch((err) => console.error("❌ Sync error:", err));

app.get('/', (req, res) => {
    res.send('API is running...');
});






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
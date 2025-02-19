import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("farmer", "buyer"),
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, 
    profileImage: {
        type: DataTypes.STRING, // Store image URL
        allowNull: true,
      },

  },
  {
    tableName: "users", // Define table name
    timestamps: true, // Adds createdAt & updatedAt
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

export default User;

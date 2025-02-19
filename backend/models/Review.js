import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    review: { type: DataTypes.TEXT },
}, { timestamps: true });

Review.belongsTo(User, { as: 'buyer', foreignKey: 'buyer_id' });
Review.belongsTo(User, { as: 'farmer', foreignKey: 'farmer_id' });

export default Review;

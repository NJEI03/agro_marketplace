import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING },
    images: { type: DataTypes.ARRAY(DataTypes.TEXT) },
}, { timestamps: true });

Product.belongsTo(User, { foreignKey: 'farmer_id', onDelete: 'CASCADE' });

export default Product;

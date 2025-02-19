import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';
import Product from './Product.js';

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed'), defaultValue: 'pending' },
}, { timestamps: true });

Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyer_id' });
Order.belongsTo(User, { as: 'farmer', foreignKey: 'farmer_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

export default Order;

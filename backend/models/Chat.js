import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Chat = sequelize.define('Chat', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

Chat.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
Chat.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

export default Chat;

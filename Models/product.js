const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mssql',
    server: 'localhost',
    database: 'Server',
});

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Products',
    timestamps: true
});

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

module.exports = Product;

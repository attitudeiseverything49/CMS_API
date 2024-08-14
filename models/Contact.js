const { DataTypes } = require('sequelize');
const short = require('short-uuid');

module.exports = (sequelize) => {
    const Contact = sequelize.define('Contact',{
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Number : {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
        },
        Mail : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Photo: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },
        Gender: {
            type: DataTypes.ENUM('Male','Female'),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        resId: {
            type: DataTypes.STRING,
            defaultValue: short.generate(),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        } }, {
        tableName: 'Contact',
        indexes: [ { unique: true, fields : ['resId'] } ]
    } );

    Contact.associate = (models) => {
        //Contact.belongsTo(models['User'], { as: 'createdBy' });
        Contact.hasMany(models['Address'], { as: 'address', foreignKey: 'contactId' });
    };
    return Contact;
};
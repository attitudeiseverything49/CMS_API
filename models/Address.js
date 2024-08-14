const { DataTypes } = require('sequelize');
const short = require('short-uuid');

module.exports = (sequelize) => {
    const Address = sequelize.define('Address',{
        addressLine1 : {
            type: DataTypes.STRING,
            allowNull: false
        },
        addressLine2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        pinCode: {
            type: DataTypes.STRING(6)
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
        } }, {
            tableName: 'Address',
            indexes: [{ unique:true, fields: ['resId']}]
        } );
        Address.associate = (models) => {
            Address.belongsTo(models['Contact'], { as: 'contactId' });
            //Address.belongsTo(models['User'], { as: 'createdBy' });
        };
        return Address;
};
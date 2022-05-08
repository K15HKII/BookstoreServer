const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Manager extends Model {
}

Manager.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    role: {
        type: DataTypes.ENUM ('admin', 'manager'),
        primaryKey: true
    },
    //TODO: profile information
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
}, {sequelize, modelName: 'manager'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/

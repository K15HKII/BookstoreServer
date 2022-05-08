const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    //TODO: fix database columns
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
    deleted_at: {
        type: DataTypes.DATE,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
    },
    is_super_admin: {
        type: DataTypes.BOOLEAN,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
    },
    is_locked: {
        type: DataTypes.BOOLEAN,
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
    },
}, {sequelize, modelName: 'user'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/

const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Transport extends Model {
}

Transport.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    transporterid: {
        type: DataTypes.INTEGER
    },
    transportid: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'transport'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/

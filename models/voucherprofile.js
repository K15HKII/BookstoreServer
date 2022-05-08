const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class VoucherProfile extends Model {
}

VoucherProfile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    //TODO: add more fields
}, {sequelize, modelName: 'voucherprofile'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/

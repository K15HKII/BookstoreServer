const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Author extends Model {
}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'author'});

class Bill extends Model {
}

Bill.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    bookid: {
        type: DataTypes.UUID
    },
    date: {
        type: DataTypes.DATE
    },
    amount: {
        type: DataTypes.DECIMAL
    },
    transportid: {
        type: DataTypes.UUID
    },
    userid: {
        type: DataTypes.UUID
    },
    billstatus: {
        type: DataTypes.ENUM('pending', 'paid', 'cancelled')
    }
}, {sequelize, modelName: 'bill'});

class Book extends Model {
}

Book.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    profileid: {
        type: DataTypes.UUID,
        primaryKey: true
    }
}, {sequelize, modelName: 'book'});

class BookProfile extends Model {
}

BookProfile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    priceid: {
        type: DataTypes.UUID,
    },
    tags: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    authorid: {
        type: DataTypes.INTEGER
    },
    publisherid: {
        type: DataTypes.INTEGER
    },
    ebookfile: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'bookprofile'});

class Cart extends Model {
}

Cart.init({
    userid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    bookprofile: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    selected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {sequelize, modelName: 'cart'});

class Lend extends Model {
}

Lend.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    bookid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    start: {
        type: DataTypes.DATE
    },
    end: {
        type: DataTypes.DATE
    }
}, {sequelize, modelName: 'lend'});

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

class MoneyHistory extends Model {
}

MoneyHistory.init({
    profileid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    versionid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    edited: { //TODO: fix database column name
        type: DataTypes.DATE
    }
}, {sequelize, modelName: 'moneyhistory'});

class Publisher extends Model {
}

Publisher.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'publisher'});

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

class Transporter extends Model {
}

Transporter.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'transporter'});

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

class Voucher extends Model {
}

Voucher.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userid: {
        type: DataTypes.UUID,
    },
    profileid: {
        type: DataTypes.UUID,
    },
    //TODO: add more fields
    vouchercode: {
        type: DataTypes.STRING,
    },
    expireddate: {
        type: DataTypes.DATE,
    },
    //TODO: fix database column name
    useddate: {
        type: DataTypes.DATE,
    }
}, {sequelize, modelName: 'voucher'});

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

class WildVoucher extends Model {
}

WildVoucher.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    profileid: {
        type: DataTypes.UUID,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    releasedate: {
        type: DataTypes.DATE,
    },
    //TODO: fix database column name
    expirydate: {
        type: DataTypes.DATE,
    },
    //TODO: reorganize database
    used: {
        type: DataTypes.BLOB,
    }
}, {sequelize, modelName: 'wildvoucher'});
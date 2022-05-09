const {Sequelize, Model, DataTypes} = require('sequelize');
const { sequelize, tryConnect } = require('../config/database');

class Author extends Model {
}

class Publisher extends Model {
}

class Transporter extends Model {
}

class Transport extends Model {
}

class User extends Model {
}

class BookProfile extends Model {
}

class PriceProfile extends Model {
}

class Book extends Model {
}

class Bill extends Model {
}

class BillDetail extends Model {
}

class CartItem extends Model {
}

class Lend extends Model {
}

class VoucherProfile extends Model {
}

class Voucher extends Model {
}

class WildVoucher extends Model {
}

//region Author
Author.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {sequelize, modelName: 'author'});
//endregion

//region Publisher
Publisher.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {sequelize, modelName: 'publisher'});
//endregion

//region Transporter
Transporter.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {sequelize, modelName: 'transporter'});
//endregion

//region Transport
Transport.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    transporterid: {
        type: DataTypes.INTEGER,
        references: {
            model: Transporter,
            key: 'id'
        }
    },
    transportid: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'transport'});
//endregion

//region User
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
    role: {
        type: DataTypes.ENUM('admin', 'user'),
    },
    //TODO: fix database columns
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
    is_active: {
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
}, {sequelize, paranoid: true, modelName: 'user'});
//endregion

//region BookProfile
BookProfile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tags: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    authorid: {
        type: DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'id'
        }
    },
    publisherid: {
        type: DataTypes.INTEGER,
        references: {
            model: Publisher,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ebookfile: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'bookprofile'});
//endregion

//region PriceProfile
PriceProfile.init({
    bookprofileid: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: BookProfile,
            key: 'id'
        }
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
}, {sequelize, modelName: 'priceprofile'});
//endregion

//region Book
Book.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    profileid: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: BookProfile,
            key: 'id'
        }
    }
}, {sequelize, modelName: 'book', paranoid: true, deletedAt: 'sell_at'});
//endregion

//region Bill
Bill.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE
    },
    transportid: {
        type: DataTypes.UUID,
        references: {
            model: Transport,
            key: 'id'
        }
    },
    userid: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    billstatus: {
        type: DataTypes.ENUM('pending', 'paid', 'cancelled')
    }
}, {sequelize, modelName: 'bill'});
//endregion

//region BillDetail
BillDetail.init({
    billid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Bill,
            key: 'id'
        }
    },
    bookid: {
        type: DataTypes.UUID,
        references: {
            model: Book,
            key: 'id'
        }
    }
}, {sequelize, modelName: 'billdetail'});
//endregion

//region CartItem
CartItem.init({
    userid: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    bookprofile: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: BookProfile,
            key: 'id'
        }
    },
    selected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {sequelize, modelName: 'cart'});
//endregion

//region Lend
Lend.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userid: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    bookprofileid: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: BookProfile,
            key: 'id'
        }
    },
    start: {
        type: DataTypes.DATE
    },
    end: {
        type: DataTypes.DATE
    }
}, {sequelize, modelName: 'lend'});
//endregion

//region VoucherProfile
VoucherProfile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    //TODO: add more fields
}, {sequelize, modelName: 'voucherprofile'});
//endregion

//region Voucher
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
        references: {
            model: VoucherProfile,
            key: 'id'
        }
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
//endregion

//region WildVoucher
WildVoucher.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    profileid: {
        type: DataTypes.UUID,
        references: {
            model: VoucherProfile,
            key: 'id'
        }
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
//endregion

Author.hasMany(BookProfile, {foreignKey: 'authorid'});

Book.belongsTo(BookProfile, { foreignKey: 'profileid' });

BookProfile.belongsTo(Author, {foreignKey: 'authorid'});
BookProfile.belongsTo(Publisher, {foreignKey: 'publisherid'});
BookProfile.hasOne(PriceProfile, {foreignKey: 'bookprofileid'});
BookProfile.hasMany(Book, {foreignKey: 'profileid'});
BookProfile.hasMany(Lend, {foreignKey: 'bookprofileid'});
/*BookProfile.belongsToMany(User, {through: 'lend', foreignKey: 'bookprofile'});
BookProfile.belongsToMany(User, {through: 'cartitem', foreignKey: 'bookprofile'});*/

Bill.belongsTo(User, {foreignKey: 'userid'});
Bill.belongsTo(Transport, {foreignKey: 'transportid'});
Bill.hasMany(BillDetail, {foreignKey: 'billid'});

BillDetail.belongsTo(Bill, {foreignKey: 'billid'});
BillDetail.belongsTo(Book, {foreignKey: 'bookid'});

/*CartItem.belongsTo(BookProfile, {foreignKey: 'bookprofile'});
CartItem.belongsTo(User, {foreignKey: 'userid'});

Lend.belongsTo(User, {foreignKey: 'userid'});
Lend.belongsTo(BookProfile, {foreignKey: 'bookprofileid'});*/

PriceProfile.belongsTo(BookProfile, {foreignKey: 'bookprofileid'});

Publisher.hasMany(BookProfile, {foreignKey: 'publisherid'});

Transport.belongsTo(Transporter, {foreignKey: 'transporterid'});
Transport.hasOne(Bill, {foreignKey: 'transportid'});

Transporter.hasMany(Transport, {foreignKey: 'transporterid'});

User.hasMany(Voucher, {foreignKey: 'userid'});
User.hasMany(Bill, {foreignKey: 'userid'});
User.hasMany(Lend, {foreignKey: 'userid'});
User.hasMany(CartItem, {foreignKey: 'userid'});
/*User.belongsToMany(BookProfile, {through: CartItem, foreignKey: 'userid'});
User.belongsToMany(BookProfile, {through: Lend, foreignKey: 'userid'});*/

Voucher.belongsTo(VoucherProfile, {foreignKey: 'profileid'});

VoucherProfile.hasMany(Voucher, {foreignKey: 'profileid'});
VoucherProfile.hasMany(WildVoucher, {foreignKey: 'profileid'});

WildVoucher.belongsTo(VoucherProfile, {foreignKey: 'profileid'});

async function Init() {
    await tryConnect();
    sequelize.sync().then(r => {
        console.log('Database connected');
    })
}

Init();

module.exports = {
    Author,
    Book,
    BookProfile,
    Bill,
    BillDetail,
    CartItem,
    Lend,
    PriceProfile,
    Publisher,
    Transport,
    Transporter,
    User,
    Voucher,
    VoucherProfile,
    WildVoucher,
    Init
}
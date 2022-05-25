const {Sequelize, Model, DataTypes, Op} = require('sequelize');
const { sequelize, tryConnect } = require('../config/database');
const crypto = require('crypto');
const authMethods = require('../routes/auth/auth.methods');
const runVariables = require('../variables/run');

class Author extends Model {
}

class Publisher extends Model {
}

class Transporter extends Model {
}

class Transport extends Model {
}

class User extends Model {

    static async findByUsername(username, attributes) {
        return await User.findOne({
            where: {
                [Op.or]: [
                    {username: username},
                    {email: username}
                ]
            },
            attributes: attributes
        });
    }

    static async createNew(username, password, callback) {
        callback(null, await User.create({
            username: username,
            password: password,
        }));
    }

}

class BookProfile extends Model {
}

class BookProfileImage extends Model {
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
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {sequelize, modelName: 'author', underscored: true});
//endregion

//region Publisher
Publisher.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {sequelize, modelName: 'publisher', underscored: true});
//endregion

//region Transporter
Transporter.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {sequelize, modelName: 'transporter', underscored: true});
//endregion

//region Transport
Transport.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'transport', underscored: true});
//endregion

//region User
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => crypto.randomBytes(16).toString('base64')
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('password', authMethods.hashSync(value, this.salt).toString('base64'));
        }
    },
    email: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
}, {sequelize, paranoid: true, modelName: 'user', underscored: true});
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
        type: DataTypes.STRING,
        allowNull: false
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
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ebookfile: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'bookprofile', underscored: true});
//endregion

//region BookProfileImage
BookProfileImage.init({
    id: {
        type: DataTypes.UUID,
        references: {
            model: BookProfile,
            key: 'id'
        },
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'bookprofileimage', underscored: true});
//endregion

//region Book
Book.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
}, {sequelize, modelName: 'book', paranoid: true, deletedAt: 'sell_at', underscored: true});
//endregion

//region Bill
Bill.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
        type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {sequelize, modelName: 'bill', underscored: true});
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
        primaryKey: true,
        references: {
            model: Book,
            key: 'id'
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {sequelize, modelName: 'billdetail', underscored: true});
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
        allowNull: false,
        defaultValue: true
    }
}, {sequelize, modelName: 'cart', underscored: true});
//endregion

//region Lend
Lend.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    bookprofileid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: BookProfile,
            key: 'id'
        }
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {sequelize, modelName: 'lend', underscored: true});
//endregion

//region VoucherProfile
VoucherProfile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    //TODO: add more fields
}, {sequelize, modelName: 'voucherprofile', underscored: true});
//endregion

//region Voucher
Voucher.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
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
        allowNull: false
    },
    expireddate: {
        type: DataTypes.DATE,
    },
    //TODO: fix database column name
    useddate: {
        type: DataTypes.DATE,
    }
}, {sequelize, modelName: 'voucher', underscored: true});
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
}, {sequelize, modelName: 'wildvoucher', underscored: true});
//endregion

Author.hasMany(BookProfile, {foreignKey: 'authorid'});
BookProfile.belongsTo(Author, {foreignKey: 'authorid'});

Book.belongsTo(BookProfile, { foreignKey: 'profileid' });
BookProfile.hasMany(Book, { foreignKey: 'profileid' });

BookProfile.belongsTo(Publisher, {foreignKey: 'publisherid'});
Publisher.hasMany(BookProfile, {foreignKey: 'publisherid'});

BookProfile.hasMany(BookProfileImage, {foreignKey: 'id'});
BookProfileImage.belongsTo(BookProfile, {foreignKey: 'id'});

BookProfile.hasMany(Lend, {foreignKey: 'bookprofileid'});
Lend.belongsTo(BookProfile, {foreignKey: 'bookprofileid'});

BookProfile.belongsToMany(User, {through: Lend, foreignKey: 'bookprofile'});
User.belongsToMany(BookProfile, {through: Lend, foreignKey: 'userid'});

BookProfile.belongsToMany(User, {through: CartItem, foreignKey: 'bookprofile'});
User.belongsToMany(BookProfile, {through: CartItem, foreignKey: 'userid'});

Bill.belongsTo(User, {foreignKey: 'userid'});
User.hasMany(Bill, {foreignKey: 'userid'});

Bill.belongsTo(Transport, {foreignKey: 'transportid'});
Transport.hasOne(Bill, {foreignKey: 'transportid'});

Bill.hasMany(BillDetail, {foreignKey: 'billid'});
BillDetail.belongsTo(Bill, {foreignKey: 'billid'});

BillDetail.belongsTo(Book, {foreignKey: 'bookid'});
Book.hasOne(BillDetail, {foreignKey: 'bookid'});

Transport.belongsTo(Transporter, {foreignKey: 'transporterid'});
Transporter.hasMany(Transport, {foreignKey: 'transporterid'});

User.hasMany(Voucher, {foreignKey: 'userid'});
Voucher.belongsTo(User, {foreignKey: 'userid'})

User.hasMany(Lend, {foreignKey: 'userid'});
Lend.belongsTo(User, {foreignKey: 'userid'});

User.hasMany(CartItem, {foreignKey: 'userid'});
CartItem.belongsTo(User, {foreignKey: 'userid'});

Voucher.belongsTo(VoucherProfile, {foreignKey: 'profileid'});
VoucherProfile.hasMany(Voucher, {foreignKey: 'profileid'});

VoucherProfile.hasMany(WildVoucher, {foreignKey: 'profileid'});
WildVoucher.belongsTo(VoucherProfile, {foreignKey: 'profileid'});

async function createSampleData() {
    const author1 = await Author.create({
        name: 'J.K. Rowling',
    });
    const author2 = await Author.create({
        name: 'J.R.R. Tolkien',
    });
    const author3 = await Author.create({
        name: 'Stephen King',
    });

    const publisher1 = await Publisher.create({
        name: 'Harper & Brothers',
    });
    const publisher2 = await Publisher.create({
        name: 'Simon & Schuster',
    });
    const publisher3 = await Publisher.create({
        name: 'Penguin',
    });

    const transporter1 = await Transporter.create({
        name: 'Shopee',
    });
    const transporter2 = await Transporter.create({
        name: 'Tiki',
    });
    const transporter3 = await Transporter.create({
        name: 'Giaohangtietkiem',
    });

    const transport1 = await Transport.create({
        transporterid: transporter1.id,
        transportid: "abc123"
    });
    const transport2 = await Transport.create({
        transporterid: transporter2.id,
        transportid: "abc124"
    });
    const transport3 = await Transport.create({
        transporterid: transporter3.id,
        transportid: "abc125"
    });

    const user1 = await User.create({
        firstname: 'John',
        lastname: 'Doe',
        username: 'admin',
        password: 'admin',
        role: 'admin',
    });

    const user2 = await User.create({
        firstname: 'Jane',
        lastname: 'Doe',
        username: 'user',
        password: 'user',
        role: 'user',
    });
    const user3 = await User.create({
        firstname: 'Jack',
        lastname: 'Doe',
        username: 'guest',
        password: 'guest',
        role: 'user'
    });

    const bookProfile1 = await BookProfile.create({
        name: 'Harry Potter and the Sorcerers Stone',
        publisherid: publisher1.id,
        authorid: author1.id,
        price: 100
    });
    const bookProfile2 = await BookProfile.create({
        name: 'The Hobbit',
        publisherid: publisher2.id,
        authorid: author2.id,
        price: 200
    });
    const bookProfile3 = await BookProfile.create({
        name: 'The Shining',
        publisherid: publisher3.id,
        authorid: author3.id,
        price: 300
    });

    const book1 = await Book.create({
        profileid: bookProfile1.id
    });
    const book2 = await Book.create({
        profileid: bookProfile2.id
    });
    const book3 = await Book.create({
        profileid: bookProfile3.id
    });

    const bill1 = await Bill.create({
        userid: user1.id,
        transportid: transport1.id,
        billstatus: 'pending'
    });
    const bill2 = await Bill.create({
        userid: user2.id,
        transportid: transport2.id,
        billstatus: 'pending'
    });

    const billDetail1 = await BillDetail.create({
        billid: bill1.id,
        bookid: book1.id,
        price: bookProfile1.price
    });
    const billDetail2 = await BillDetail.create({
        billid: bill1.id,
        bookid: book2.id,
        price: bookProfile2.price
    });
    const billDetail3 = await BillDetail.create({
        billid: bill2.id,
        bookid: book3.id,
        price: bookProfile3.price
    });

    const cartItem1 = await CartItem.create({
        userid: user3.id,
        bookprofile: bookProfile1.id,
    });
    const cartItem2 = await CartItem.create({
        userid: user3.id,
        bookprofile: bookProfile2.id,
    });
    const cartItem3 = await CartItem.create({
        userid: user1.id,
        bookprofile: bookProfile3.id,
    });

    const lend1 = await Lend.create({
        userid: user1.id,
        bookprofileid: bookProfile1.id,
        start: new Date(),
        end: new Date(),
    });

    const voucherProfile1 = await VoucherProfile.create({

    });

    const voucher1 = await Voucher.create({
        profileid: voucherProfile1.id,
        userid: user1.id,
        vouchercode: '12345',
    });
}

async function Init() {
    await tryConnect();
    await sequelize.sync({ force: false }).then(r => {
        console.log('Database connected');
    })
    if (runVariables.init) {
        await createSampleData();
    }
}

Init().then(async () => {
    console.log('Database created');
});

module.exports = {
    Author,
    Book,
    BookProfile,
    BookProfileImage,
    Bill,
    BillDetail,
    CartItem,
    Lend,
    Publisher,
    Transport,
    Transporter,
    User,
    Voucher,
    VoucherProfile,
    WildVoucher
}

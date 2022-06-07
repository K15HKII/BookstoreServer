import {AppDataSource} from "../config/database";
import {User, UserAddress, UserBank} from "./user";
import {init} from "../variables/run.variable";
import {Role} from "./role";
import {Author} from "./author";
import {Publisher} from "./publisher";
import {Transporter} from "./transporter";
import {Transport} from "./transport";
import {Book, FavouriteBook} from "./book";
import {Bill} from "./bill";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";
import {CartItem} from "./cartitem";
import {Lend} from "./lend";
import {BookTagVoucher, DiscountType, Voucher} from "./voucher";
import {BookTag} from "./booktag";

async function InitAuthor() {
    const authorRepo = AppDataSource.getRepository(Author);

    const author1: Author = authorRepo.create({
        name: 'J.K. Rowling'
    })
    await authorRepo.save(author1);

    const author2: Author = authorRepo.create({
        name: 'J.R.R. Tolkien'
    })
    await authorRepo.save(author2);

    const author3: Author = authorRepo.create({
        name: 'Stephen King'
    })
    await authorRepo.save(author3);
    console.log('Author created');
}

async function InitPublisher() {
    const publisherRepo = AppDataSource.getRepository(Publisher);

    const publisher1: Publisher = publisherRepo.create({
        name: 'Penguin Books'
    })
    await publisherRepo.save(publisher1);

    const publisher2: Publisher = publisherRepo.create({
        name: 'HarperCollins'
    })
    await publisherRepo.save(publisher2);

    const publisher3: Publisher = publisherRepo.create({
        name: 'Simon & Schuster'
    })
    await publisherRepo.save(publisher3);
    console.log('Publisher created');
}

async function InitTransporter() {
    const transporterRepo = AppDataSource.getRepository(Transporter);

    const transporter1: Transporter = transporterRepo.create({
        name: 'Amazon'
    })
    await transporterRepo.save(transporter1);

    const transporter2: Transporter = transporterRepo.create({
        name: 'FedEx'
    })
    await transporterRepo.save(transporter2);

    const transporter3: Transporter = transporterRepo.create({
        name: 'UPS'
    })
    await transporterRepo.save(transporter3);
    console.log('Transporter created');
}

async function InitCommon() {
    const userRepo = AppDataSource.getRepository(User);
    const addressRepo = AppDataSource.getRepository(UserAddress);
    const bankRepo = AppDataSource.getRepository(UserBank);

    //region User
    //region User1
    const user1: User = userRepo.create({
        firstname: 'John',
        lastname: 'Doe',
        username: 'admin',
        password: 'admin',
        role: Role.ADMIN
    });
    await userRepo.save(user1);

    const bank1: UserBank = bankRepo.create({
        user_id: user1.id,
        bank_name: 'Bank of America',
        iban: '123456789',
        bic: '123456789'
    });
    await bankRepo.save(bank1);

    const address1: UserAddress = addressRepo.create({
        user_id: user1.id,
        street: '123 Main St',
        city: 'Anytown',
        zip: '12345',
        country: 'USA'
    });
    await addressRepo.save(address1);

    const address2: UserAddress = addressRepo.create({
        user_id: user1.id,
        street: '456 Main St',
        city: 'Anytown',
        zip: '12345',
        country: 'USA'
    });
    await addressRepo.save(address2);
    //endregion

    //region User2
    const user2: User = userRepo.create({
        firstname: 'Jane',
        lastname: 'Doe',
        username: 'user',
        password: 'user',
        role: Role.USER
    });
    await userRepo.save(user2);

    const bank2: UserBank = bankRepo.create({
        user_id: user2.id,
        bank_name: 'Bank of America',
        iban: '123456789',
        bic: '123456789'
    });

    const address3: UserAddress = addressRepo.create({
        user_id: user2.id,
        street: '789 Main St',
        city: 'Anytown',
        zip: '12345',
        country: 'USA'
    });
    await addressRepo.save(address3);
    //endregion

    //region User3
    const user3: User = userRepo.create({
        firstname: 'Jack',
        lastname: 'Doe',
        username: 'guest',
        password: 'guest',
        role: Role.USER
    })
    await userRepo.save(user3);

    const bank3: UserBank = bankRepo.create({
        user_id: user3.id,
        bank_name: 'Bank of America',
        iban: '123456789',
        bic: '123456789'
    });

    const address4: UserAddress = addressRepo.create({
        user_id: user3.id,
        street: '1011 Main St',
        city: 'Anytown',
        zip: '12345',
        country: 'USA'
    });
    await addressRepo.save(address4);
    console.log('Users created');
    //endregion
    //endregion

    //region Transport
    const transportRepo = AppDataSource.getRepository(Transport);

    const transport1: Transport = transportRepo.create({
        transporter_id: 1,
        tracking: '123456789'
    })
    await transportRepo.save(transport1);

    const transport2: Transport = transportRepo.create({
        transporter_id: 2,
        tracking: '123456789'
    })
    await transportRepo.save(transport2);

    const transport3: Transport = transportRepo.create({
        transporter_id: 3,
        tracking: '123456789'
    })
    await transportRepo.save(transport3);
    console.log('Transports created');
    //endregion

    //region Book
    const bookRepo = AppDataSource.getRepository(Book);

    const book1: Book = bookRepo.create({
        title: 'Harry Potter and the Philosopher\'s Stone',
        author_id: 1,
        publisher_id: 1,
        isbn: '123456789',
        price: 10.00,
        stock: 10
    })
    await bookRepo.save(book1);

    const book2: Book = bookRepo.create({
        title: 'Harry Potter and the Chamber of Secrets',
        author_id: 1,
        publisher_id: 1,
        isbn: '123456789',
        price: 10.00,
        stock: 10
    })
    await bookRepo.save(book2);

    const book3: Book = bookRepo.create({
        title: 'The Shining',
        author_id: 2,
        publisher_id: 2,
        isbn: '123456789',
        price: 10.00,
        stock: 10
    })
    await bookRepo.save(book3);

    const book4: Book = bookRepo.create({
        title: 'The Stand',
        author_id: 3,
        publisher_id: 3,
        isbn: '123456789',
        price: 10.00,
        stock: 10
    })
    await bookRepo.save(book4);
    console.log('Books created');
    //endregion

    //region CartItem
    const cartItemRepo = AppDataSource.getRepository(CartItem);
    const cartItem1 = cartItemRepo.create({
        user_id: user1.id,
        book_id: book1.id,
        quantity: 1
    });
    await cartItemRepo.save(cartItem1);

    const cartItem2 = cartItemRepo.create({
        user_id: user1.id,
        book_id: book2.id,
        quantity: 1
    });
    await cartItemRepo.save(cartItem2);

    const cartItem3 = cartItemRepo.create({
        user_id: user2.id,
        book_id: book3.id,
        quantity: 1
    });
    await cartItemRepo.save(cartItem3);
    //endregion

    //region Bill
    const billRepo = AppDataSource.getRepository(Bill);
    const billDetail = AppDataSource.getRepository(BillDetail);

    const bill1: Bill = billRepo.create({
        user_id: user1.id,
        status: BillStatus.WAITING,
        transport_id: transport1.id,
        address_id: address1.updated_at
    });

    const billDetail1: BillDetail = billDetail.create({
        bill_id: bill1.id,
        book_id: book1.id,
        quantity: 1,
        unit_price: book1.price
    });

    const billDetail2: BillDetail = billDetail.create({
        bill_id: bill1.id,
        book_id: book2.id,
        quantity: 1,
        unit_price: book2.price
    });

    bill1.bill_details = [];
    bill1.bill_details.push(billDetail1, billDetail2);

    await billRepo.save(bill1);

    const bill2: Bill = billRepo.create({
        user_id: user2.id,
        status: BillStatus.WAITING,
        transport_id: transport2.id,
        address_id: address2.updated_at
    });

    const billDetail3: BillDetail = billDetail.create({
        bill_id: bill2.id,
        book_id: book3.id,
        quantity: 1,
        unit_price: book3.price
    });

    const billDetail4: BillDetail = billDetail.create({
        bill_id: bill2.id,
        book_id: book4.id,
        quantity: 1,
        unit_price: book4.price
    });
    bill2.bill_details = [];
    bill2.bill_details.push(billDetail3, billDetail4);
    await billRepo.save(bill2);
    console.log('Bills created');
    //endregion

    //region Lend
    const lendRepo = AppDataSource.getRepository(Lend);
    const lend1 = lendRepo.create({
        user_id: user1.id,
        book_id: book1.id,
        unit_price: book1.price,
        start_date: new Date(),
        end_date: new Date(),
    });
    await lendRepo.save(lend1);

    const lend2 = lendRepo.create({
        user_id: user1.id,
        book_id: book2.id,
        unit_price: book2.price,
        start_date: new Date(),
        end_date: new Date(),
    });
    await lendRepo.save(lend2);
    //endregion

    //region VoucherProfile
    const voucherProfileRepo = AppDataSource.getRepository(BookTagVoucher);
    const voucherProfile1 = voucherProfileRepo.create({
        name: 'Voucher 1',
        description: 'Voucher 1',
        discount: 10,
        discount_type: DiscountType.PERCENTAGE,
        tags: [BookTag.Autobiography, BookTag.Art]
    });
    await voucherProfileRepo.save(voucherProfile1);

    const voucherProfile2 = voucherProfileRepo.create({
        name: 'Voucher 2',
        description: 'Voucher 2',
        discount: 20,
        discount_type: DiscountType.PERCENTAGE,
        tags: [BookTag.Art]
    });
    await voucherProfileRepo.save(voucherProfile2);
    //endregion

    //region Voucher
    const voucherRepo = AppDataSource.getRepository(Voucher);
    const voucher1 = voucherRepo.create({
        code: 'VOUCHER1',
        release_date: new Date(),
        expire_date: new Date(),
        profile_id: voucherProfile1.id,
        user_id: user1.id
    });
    await voucherRepo.save(voucher1);
    //endregion

    const favouriteBooKRepo = AppDataSource.getRepository(FavouriteBook);
    const favouriteBook1 = favouriteBooKRepo.create({
        user_id: user1.id,
        book_id: book1.id
    });
    await favouriteBooKRepo.save(favouriteBook1);

    const favouriteBook2 = favouriteBooKRepo.create({
        user_id: user1.id,
        book_id: book2.id
    });
    await favouriteBooKRepo.save(favouriteBook2);
}

export async function InitSamples() {
    console.log('Initializing database...');
    if (!init) {
        console.log('Database already initialized.');
        return;
    }
    console.log('Sample initializing...');

    await InitAuthor();
    await InitPublisher();
    await InitTransporter();
    await InitCommon();

    console.log('Samples initialized');
}

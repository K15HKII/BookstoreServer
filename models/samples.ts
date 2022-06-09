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
import {DiscountType, Voucher, VoucherProfile} from "./voucher";
import {BookTag} from "./booktag";
import {Image} from "./file";
import {log} from "util";

async function InitCommon() {
    //region Author
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

    const author4: Author = authorRepo.create({
        name: 'Nguyễn Nhật Ánh'
    })
    await authorRepo.save(author4);

    const author5: Author = authorRepo.create({
        name: 'Thạch Lam'
    })
    await authorRepo.save(author5);

    const author6: Author = authorRepo.create({
        name: 'Ngô Tất Tố'
    })
    await authorRepo.save(author6);

    const author7: Author = authorRepo.create({
        name: 'Hồ Chí Minh'
    })
    await authorRepo.save(author7);

    const author8: Author = authorRepo.create({
        name: 'Trần Đăng Khoa'
    })
    await authorRepo.save(author8);

    const author9: Author = authorRepo.create({
        name: 'Vũ Trọng Phụng'
    })
    await authorRepo.save(author9);

    const author10: Author = authorRepo.create({
        name: 'Xuân Diệu'
    })
    await authorRepo.save(author10);

    const author11: Author = authorRepo.create({
        name: 'Fujiko Fujio'
    })
    await authorRepo.save(author11);
    console.log('Author created');
    //endregion

    //region Publisher
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

    const publisher4: Publisher = publisherRepo.create({
        name: 'Nhà Xuất Bản Trẻ'
    })
    await publisherRepo.save(publisher4);

    const publisher5: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Kim Đồng'
    })
    await publisherRepo.save(publisher5);

    const publisher6: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Sự Thật'
    })
    await publisherRepo.save(publisher6);

    const publisher7: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Giáo Dục'
    })
    await publisherRepo.save(publisher7);

    const publisher8: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Đại Học Quốc Gia Hồ Chí Minh'
    })
    await publisherRepo.save(publisher8);

    const publisher9: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản tổng hợp Thành Phố Hồ Chí Minh'
    })
    await publisherRepo.save(publisher9);

    const publisher10: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Chính Trị và Quốc Gia'
    })
    await publisherRepo.save(publisher10);
    console.log('Publisher created');
    //endregion

    //region Transporter
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
    //endregion

    const imageRepo = AppDataSource.getRepository(Image);

    const image1 = imageRepo.create({
        id: "a4392290-15c6-4f15-bd2a-aca9d2b8ef42",
        name: "sample.png",
        path: "a4392290-15c6-4f15-bd2a-aca9d2b8ef42.png",
        height: 100,
        width: 100,
    });
    await imageRepo.save(image1);

    const image2 = imageRepo.create({
        id: "a1f49fb4-6ad8-4e07-99e8-d5d9893a985c",
        name: "sample2.png",
        path: "a1f49fb4-6ad8-4e07-99e8-d5d9893a985c.png",
        height: 100,
        width: 100,
    });
    await imageRepo.save(image2);

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
        stock: 10,
        tags: [BookTag.Drama, BookTag.Drama]
    })
    book1.images = [image1];
    await bookRepo.save(book1);

    const book2: Book = bookRepo.create({
        title: 'Harry Potter and the Chamber of Secrets',
        author_id: 1,
        publisher_id: 1,
        isbn: '123456789',
        price: 10.00,
        stock: 10,
        tags: [BookTag.Autobiography, BookTag.Art]
    })
    book2.images = [image2];
    await bookRepo.save(book2);

    const book3: Book = bookRepo.create({
        title: 'The Shining',
        author_id: 2,
        publisher_id: 2,
        isbn: '123456789',
        price: 10.00,
        stock: 10,
        tags: [BookTag.Horror, BookTag.Thriller]
    })
    await bookRepo.save(book3);

    const book4: Book = bookRepo.create({
        title: 'The Stand',
        author_id: 3,
        publisher_id: 3,
        isbn: '123456789',
        price: 10.00,
        stock: 10,
        tags: [BookTag.Horror, BookTag.Thriller]
    })
    await bookRepo.save(book4);

    const book5: Book = bookRepo.create({
        title: 'Mắt Biếc',
        author_id: author4.id,
        publisher_id: publisher4.id,
        isbn: '123456789',
        price: 12.00,
        stock: 20,
        tags: [BookTag.Essay, BookTag.Art]
    })
    book5.images = [];
    await bookRepo.save(book5);

    const book6: Book = bookRepo.create({
        title: 'Hai đứa trẻ',
        author_id: author5.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        price: 12.00,
        stock: 14,
        tags: [BookTag.Art, BookTag.Literature]
    })
    book6.images = [];
    await bookRepo.save(book6);

    const book7: Book = bookRepo.create({
        title: 'Tắt đèn',
        author_id: author6.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        price: 12.00,
        stock: 14,
        tags: [BookTag.Art, BookTag.Literature]
    })
    book7.images = [];
    await bookRepo.save(book7);

    const book8: Book = bookRepo.create({
        title: 'Làm Đĩ',
        author_id: author9.id,
        publisher_id: publisher5.id,
        isbn: '123456789',
        price: 13.00,
        stock: 14,
        tags: [BookTag.Art, BookTag.Literature]
    })
    book8.images = [];
    await bookRepo.save(book8);

    const book9: Book = bookRepo.create({
        title: 'Nhật kí trong tù',
        author_id: author7.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        price: 20.00,
        stock: 10,
        tags: [BookTag.History, BookTag.Literature]
    })
    book9.images = [];
    await bookRepo.save(book9);

    const book10: Book = bookRepo.create({
        title: 'Xuân Diệu tác phẩm chọn lọc',
        author_id: author10.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        price: 20.00,
        stock: 10,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book10.images = [];
    await bookRepo.save(book10);

    const book11: Book = bookRepo.create({
        title: 'doraemon',
        author_id: author11.id,
        publisher_id: publisher5.id,
        isbn: '123456789',
        price: 25.00,
        stock: 10,
        tags: [BookTag.Comedy, BookTag.Humor]
    })
    book11.images = [];
    await bookRepo.save(book11);

    const book12: Book = bookRepo.create({
        title: 'doraemon p2',
        author_id: author11.id,
        publisher_id: publisher5.id,
        isbn: '123456789',
        price: 25.00,
        stock: 10,
        tags: [BookTag.Comedy, BookTag.Humor]
    })
    book12.images = [];
    await bookRepo.save(book12);

    const book13: Book = bookRepo.create({
        title: 'Tuyển thơ',
        author_id: author8.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        price: 35.00,
        stock: 20,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book13.images = [];
    await bookRepo.save(book13);

    const book14: Book = bookRepo.create({
        title: 'Đảo mộng mơ',
        author_id: author4.id,
        publisher_id: publisher4.id,
        isbn: '123456789',
        price: 35.00,
        stock: 20,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book14.images = [];
    await bookRepo.save(book14);

    const book15: Book = bookRepo.create({
        title: 'Trại hoa vàng',
        author_id: author4.id,
        publisher_id: publisher4.id,
        isbn: '123456789',
        price: 35.00,
        stock: 22,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book15.images = [];
    await bookRepo.save(book15);

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
        address_id: address1.sub_id
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
        address_id: address2.sub_id
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
    const voucherProfileRepo = AppDataSource.getRepository(VoucherProfile);
    const voucherProfile1 = voucherProfileRepo.create({
        name: 'Voucher 1',
        description: 'Voucher 1',
        discount: 10,
        discount_type: DiscountType.PERCENTAGE,
        require_book_tags: [BookTag.Autobiography, BookTag.Art]
    });
    await voucherProfileRepo.save(voucherProfile1);

    const voucherProfile2 = voucherProfileRepo.create({
        name: 'Voucher 2',
        description: 'Voucher 2',
        discount: 20,
        discount_type: DiscountType.PERCENTAGE,
        require_book_tags: [BookTag.Art]
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

    await InitCommon();

    console.log('Samples initialized');
}

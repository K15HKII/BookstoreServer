import {AppDataSource} from "../config/typeorm.database";
import {User, UserAddress, UserBank} from "./user";
import {init} from "../variables/run";
import {Role} from "./role";
import {Author} from "./author";
import {Publisher} from "./publisher";
import {Transporter} from "./transporter";
import {Transport} from "./transport";
import {Book} from "./book";
import {Bill} from "./bill";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";

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
}

async function InitBook() {

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
}

async function InitUserSamples() {
    const userRepo = AppDataSource.getRepository(User);
    const addressRepo = AppDataSource.getRepository(UserAddress);
    const bankRepo = AppDataSource.getRepository(UserBank);

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
        zip: '12345'
    });
    await addressRepo.save(address1);

    const address2: UserAddress = addressRepo.create({
        user_id: user1.id,
        street: '456 Main St',
        city: 'Anytown',
        zip: '12345'
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
        zip: '12345'
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
        zip: '12345'
    });
    await addressRepo.save(address4);
    //endregion

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

    const billRepo = AppDataSource.getRepository(Bill);
    const billDetail = AppDataSource.getRepository(BillDetail);

    const bill1: Bill = billRepo.create({
        user_id: user1.id,
        status: BillStatus.PAID,
        transport_id: transport1.id,
    });
    await billRepo.save(bill1);

    const billDetail1: BillDetail = billDetail.create({
        bill_id: bill1.id,
        book_id: book1.id,
        quantity: 1
    });
    await billDetail.save(billDetail1);

    const billDetail2: BillDetail = billDetail.create({
        bill_id: bill1.id,
        book_id: book2.id,
        quantity: 1
    });
    await billDetail.save(billDetail2);

    const bill2: Bill = billRepo.create({
        user_id: user2.id,
        status: BillStatus.PAID,
        transport_id: transport2.id,
    });
    await billRepo.save(bill2);

    const billDetail3: BillDetail = billDetail.create({
        bill_id: bill2.id,
        book_id: book3.id,
        quantity: 1
    });
    await billDetail.save(billDetail3);

    const billDetail4: BillDetail = billDetail.create({
        bill_id: bill2.id,
        book_id: book4.id,
        quantity: 1
    });
    await billDetail.save(billDetail4);

}

export function InitSamples() {
    if (!init) {
        return;
    }

    const user1: User = new User();

}
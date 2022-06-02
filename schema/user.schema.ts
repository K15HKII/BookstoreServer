import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";
import {Gender} from "../models/user";

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Id of user
 *    UserSearch:
 *      type: object
 *      properties:
 *        skip:
 *          type: integer
 *          description: The number of users to skip.
 *        limit:
 *          type: integer
 *          description: The number of users to return.
 */

export class UserSearch {

    @IsInt()
    @Min(0)
    skip: number;

    @IsInt()
    @Min(1)
    limit: number;

}

export class ProfileUpdateRequest {

    @IsString()
    firstname: string

    @IsString()
    lastname: string

    @IsString()
    email: string

    @IsString()
    phone: string

    @IsEnum(Gender)
    gender: string

    @IsDateString()
    birthday: string

}

export class FavouriteBookCRUDRequest {

    @IsString()
    @IsDefined()
    book_id: string

}

export class CartItemAddCRUDRequest {

    @IsString()
    @IsDefined()
    book_id: string

}

export class CartItemUpdateRequest extends CartItemAddCRUDRequest {

    @IsInt()
    @Min(1)
    quantity: number

    @IsBoolean()
    selected: boolean

}
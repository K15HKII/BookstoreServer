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
 *        firstname:
 *          type: string
 *          description: Firstname of user
 *        lastname:
 *          type: string
 *          description: Lastname of user
 *        email:
 *          type: string
 *          description: Email of user
 *        username:
 *          type: string
 *          description: Username of user
 *        age:
 *          type: integer
 *          description: Age of user
 *        phone:
 *          type: string
 *          description: Phone of user
 *        gender:
 *          type: string
 *          description: Gender of user
 *          enum:
 *          - MALE
 *          - FEMALE
 *          - OTHER
 *        birthday:
 *          type: string
 *          format: date-time
 *          description: Birthday of user
 *        password:
 *          type: string
 *          description: Password of user
 *        salt:
 *          type: string
 *          description: Salt of user
 *        role:
 *          type: string
 *          description: Role of user
 *          enum:
 *          - ADMIN
 *          - USER
 *        refresh_token:
 *          type: string
 *          description: Refresh token of user
 *    UserAddress:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *          description: Id of user
 *        updated_at:
 *          type: string
 *          format: date-time
 *          description: Updated at of user
 *        street:
 *          type: string
 *          description: Street of useraddress
 *        city:
 *          type: string
 *          description: City of useraddress
 *        zip:
 *          type: string
 *          description: Zip of useraddress
 *        country:
 *          type: string
 *          description: Country of useraddress
 *    UserBank:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *          description: Id of user
 *        updated_at:
 *          type: string
 *          format: date-time
 *          description: Updated at of user
 *        bank_name:
 *          type: string
 *          description: Bank name of userbank
 *        iban:
 *          type: string
 *          description: IBAN of userbank
 *        bic:
 *          type: string
 *          description: BIC of userbank
 *    UserSearch:
 *      type: object
 *      properties:
 *        skip:
 *          type: integer
 *          description: The number of users to skip.
 *        limit:
 *          type: integer
 *          description: The number of users to return.
 *    ProfileUpdateRequest:
 *      type: object
 *      properties:
 *        firstname:
 *          type: string
 *          description: Firstname of user
 *        lastname:
 *          type: string
 *          description: Lastname of user
 *        email:
 *          type: string
 *          description: Email of user
 *        phone:
 *          type: string
 *          description: Phone of user
 *        gender:
 *          type: string
 *          description: Gender of user
 *          enum:
 *          - MALE
 *          - FEMALE
 *          - OTHER
 *        birthday:
 *          type: string
 *          description: Birthday of user
 *    FavouriteBookCRUDRequest:
 *      type: object
 *      properties:
 *        book_id:
 *          type: string
 *          description: Id of book
 *    CartItemAddCRUDRequest:
 *      type: object
 *      properties:
 *        book_id:
 *          type: string
 *          description: Id of book
 *    CartItemUpdateRequest:
 *      allOf:
 *        - $ref: '#components/schemas/CartItemAddCRUDRequest'
 *        - type: object
 *          properties:
 *            quantity:
 *              type: integer
 *              description: Quantity of book
 *            selected:
 *              type: boolean
 *              description: Selected of book
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

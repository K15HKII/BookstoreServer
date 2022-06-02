import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    BillDetail:
 *      type: object
 *      properties:
 *        bill_id:
 *          type: integer
 *          description: Id of bill
 *        book_id:
 *          type: string
 *          description: Id of book
 *        unit_price:
 *          type: decimal
 *          description: Unit price of bill
 *        quantity:
 *          type: integer
 *          description: Quantity of bill
 *          default: 1
 */

import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";
import {BillStatus} from "../models/billstatus";

/**
 * @openapi
 * components:
 *  schemas:
 *    Bill:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Id of bill
 *        transport_id:
 *          type: string
 *          description: Transport id of bill
 *        user_id:
 *          type: string
 *          description: User id of bill
 *        status:
 *          type: string
 *          description: Status of bill
 *          default: WAITING
 *          enum:
 *          - WAITING
 *          - PROCESSING
 *          - COMPLETED
 *          - CANCELED
 *          - TRANSPORTING
 */

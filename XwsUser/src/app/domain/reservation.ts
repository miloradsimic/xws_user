import { User } from "./user";
import { Accommodation } from "./accommodation";

export class Reservation {
    id?: number;
    from?: Date;
    to?: Date;
    price?: number;
    approved?: boolean;
    client?: User;
    accommodation?: Accommodation;
}

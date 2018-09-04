import { AccommodationType } from "./accommodation-type";
import { Agent } from "./agent";
import { Reservation } from "./reservation";
import { Comment } from "./comment";

export class Accommodation {
    id?: number;
    address?: string;
    category?: number;
    type?: AccommodationType;
    description?: string;
    imageUri?: string;
    parking?: boolean;
    wifi?: boolean;
    breakfast?: boolean;
    halfBoard?: boolean;
    fullBoard?: boolean;
    tv?: boolean;
    kitchen?: boolean;
    privateBathroom?: boolean;
    dailyPrice?: number;

    agent?: Agent;
    reservations?: Reservation[];
    comments?: Comment[]
}

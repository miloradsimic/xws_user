import { Client } from "./client";

export class Message {
    id?: number;
    sender?: Client;
    receiver?: Client;
    text?: string;
    time?: Date;
}

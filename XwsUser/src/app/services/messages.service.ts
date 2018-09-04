import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../domain/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private client: HttpClient) { }

  sendMessage(receiverId: number, text: string): Observable<Message> {
    return this.client.post<Message>("/backend/message/message", {
      receiver_id: receiverId,
      text: text
    });
  }

  getAllUsersSentMessages(): Observable<Message[]> {
    return this.client.get<Message[]>("/backend/message/all_sent");
  }

  getAllUsersReceivedMessages(): Observable<Message[]> {
    return this.client.get<Message[]>("/backend/message/all_received");
  }

}

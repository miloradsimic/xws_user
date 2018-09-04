import { Component, OnInit } from '@angular/core';
import { Message } from '../../domain/message';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  sentMessages: Message[];
  receivedMessages: Message[];

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    let component = this;
    this.messagesService.getAllUsersSentMessages().subscribe(
      (sentMessages) => { component.sentMessages = sentMessages; },
      (errorResponse) => { alert("Remote error! Server response: " + JSON.stringify(errorResponse)); }
    );
    this.messagesService.getAllUsersReceivedMessages().subscribe(
      (receivedMessages) => { component.receivedMessages = receivedMessages; },
      (errorResponse) => { alert("Remote error! Server response: " + JSON.stringify(errorResponse)); }
    );
  }

  handleMessageSent(message: Message) {
    this.sentMessages.push(message);
  }

}

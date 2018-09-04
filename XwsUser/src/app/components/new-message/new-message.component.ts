import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '../../domain/message';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';
import { MessagesService } from '../../services/messages.service';
import { Client } from '../../domain/client';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  @Input() receiver: Client;
  @Output() messageSent = new EventEmitter<Message>();

  message: Message;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginServiceService,
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.message = {};
  }

  open(content) {
    this.message = {};
    let component = this;
    if(!this.loginService.isLoggedIn()) {
      let result = confirm("You are not logged in! Redirect to login?");
      if(result) {
        this.router.navigate(["/login"]);
        return;
      }
      else {
        return;
      }
    }
    this.message.sender = this.loginService.getLoggedUser();
    this.message.receiver = this.receiver;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      component.messagesService.sendMessage(component.message.receiver.id, component.message.text).subscribe(
        (message) => {
          alert(`Message is successfully sent!`);
          component.messageSent.emit(message);
        },
        (errorResponse) => {
          alert("Remote error! Server response: " + JSON.stringify(errorResponse));
        }
      );
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.message = {};
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}

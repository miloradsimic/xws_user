import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginServiceService } from '../../services/login-service.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../domain/comment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() accommodationId: number;

  private comment: Comment;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginServiceService,
    private commentService: CommentService
  ) {
    this.comment = {};
  }

  ngOnInit() {
  }

  open(content) {
    this.comment = {};
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      component.commentService.postCommentForAccommodation(component.accommodationId, component.comment.text).subscribe(
        (comment) => {
          alert("Comment is posted and is waiting for approval!");
        },
        (errorResponse) => {
          alert("Remote error! Server response: " + JSON.stringify(errorResponse));
        }
      );
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.comment = {};
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}

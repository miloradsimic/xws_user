import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private client: HttpClient) { }

  getCommentsForAccommodation(id: number): Observable<Comment[]> {
    return this.client.get<Comment[]>(`/backend/comment/comments_for_accommodation/${id}`);
  }

  postCommentForAccommodation(id: number, text: string):Observable<Comment> {
    return this.client.post<Comment>(`/backend/comment/comment`, {
      accommodation_id: id,
      text: text
    });
  }

}

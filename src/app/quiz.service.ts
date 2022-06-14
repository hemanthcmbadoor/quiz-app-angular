import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetQuizResponse } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizDataUrl = 'https://opentdb.com/api.php?amount=3&type=multiple';

  constructor(private http: HttpClient) { }

  getQuizData(): Observable<GetQuizResponse> {
    return this.http.get<GetQuizResponse>(this.quizDataUrl);
  }
}

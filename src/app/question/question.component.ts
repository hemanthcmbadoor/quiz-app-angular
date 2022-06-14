import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QUIZ_DATA } from '../quiz.data';
import { Data, GetQuizResponse } from '../quiz.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = '';
  public questionList:any = QUIZ_DATA;

  public currentQuestion: number = 0;
  public TotalQuestions: number = 0;
  public points: number = 0;
  public counter: number = 60;

  public correctAnswer: number = 0;
  public wrongAnswer: number = 0;

  interval$: any;
  progress: number = 0;
  isQuizCompleted: boolean = false;

  constructor(
    private quizService: QuizService
  ) { 
    //
  }

  ngOnInit(): void {
      this.name = localStorage.getItem('name')!;
      this.getAllQuestions();
      this.startCounter();
  }

  getAllQuestions(){
    this.quizService.getQuizData().subscribe((res: any)  => {

      if(res?.results){
        
          this.questionList = res;

          this.questionList.results.forEach((element: any) => {
              element.options = [];
              element.options?.push(element.incorrect_answers[0]);
              element.options?.push(element.incorrect_answers[1]);
              element.options?.push(element.incorrect_answers[2]);
              element.options?.push(element.correct_answer);

              element.options = this.shuffleOptions(element.options);
          });
          this.TotalQuestions = this.questionList.results.length;
      }
  });
  }

  nextQuestion(){
    this.currentQuestion++;
    this.resetCounter();
    this.getProgressData();
  }

  previousQuestion(){
    this.currentQuestion--;
    this.resetCounter();
  }

  shuffleOptions(options: []){
      let currentIndex:any = options.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = options[currentIndex];
        options[currentIndex] = options[randomIndex];
        options[randomIndex] = temporaryValue;
      }
      return options;
  }

  answer(currentQuestion: number, option: string, correctOption: string){

    if(option == correctOption){
        this.points += 10;
        this.correctAnswer++;
        
        setTimeout(()=>{
          this.currentQuestion++;
          this.getProgressData();
          this.resetCounter();

          if(this.currentQuestion === this.TotalQuestions){
            this.isQuizCompleted = true;
            this.stopCounter();
          }
        },1000);

    } else {

        this.points -= 10;
        this.wrongAnswer++;

        setTimeout(()=>{
          this.currentQuestion++;
          this.getProgressData();
          this.resetCounter();

          if(currentQuestion === this.TotalQuestions){
            this.isQuizCompleted = true;
            this.stopCounter();
          }
          
        },1000);
    }
  }

  startCounter(){
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;

      if(this.currentQuestion === this.TotalQuestions){
        this.isQuizCompleted = true;
        this.stopCounter();
      }

      if(this.counter === 0){
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });

    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.getProgressData();
    this.isQuizCompleted = false;
  }

  getProgressData(){
    this.progress = (this.currentQuestion / this.TotalQuestions) * 100;
  }

}

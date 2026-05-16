import { Component, effect, input, output, signal } from '@angular/core';
import { AnswerOption } from '@core/models';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-date-question',
  imports: [DatePickerModule, FormsModule],
  templateUrl: './date-question.component.html',
})
export class DateQuestion {
  public answers = input<AnswerOption[]>([]);
  public isAdmin = input<boolean>(true);
  public currentAnswer = input<Date>(new Date());

  // local mutable state za ngModel
  public selectedAnswers = signal<Date>(new Date());

  constructor() {
    effect(() => {
      this.selectedAnswers.set(this.currentAnswer());
    });
  }

  public answered = output<Date>();

  setAnswerValues(values: Date) {
    this.selectedAnswers.set(values);
    this.answered.emit(values);
  }
}

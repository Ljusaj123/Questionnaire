import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerOption } from '@core/models';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-date-question',
  imports: [DatePickerModule, FormsModule],
  templateUrl: './date-question.component.html',
})
export class DateQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() isAdmin: boolean = true;
  @Input() currentAnswer: Date = new Date();

  @Output() answered = new EventEmitter<Date>();
}

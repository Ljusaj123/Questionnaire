import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<Date>();

  public selectedValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.selectedValue = null;
    }
  }

  onDateChange(event: any) {
    this.selectedValue = event.value;
    this.answered.emit(event.value);
  }
}

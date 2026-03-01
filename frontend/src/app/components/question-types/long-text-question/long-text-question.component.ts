import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerOption } from '@core/models';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-long-text-question',
  imports: [TextareaModule, FormsModule],
  templateUrl: './long-text-question.component.html',
})
export class LongTextQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<string>();

  public enteredValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.enteredValue = null;
    }
  }

  onTextChange(event: Event) {
    this.enteredValue = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.answered.emit(this.enteredValue);
  }
}

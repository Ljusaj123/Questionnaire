import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() isAdmin: boolean = true;
  @Input() currentAnswer: string = '';

  @Output() answered = new EventEmitter<string>();
}

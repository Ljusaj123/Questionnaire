
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerOption } from '@core/models';

import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radio-question',
  imports: [RadioButtonModule, FormsModule],
  templateUrl: './radio-question.component.html',
})
export class RadioQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() isAdmin: boolean = true;
  @Input() currentAnswer: string = '';

  @Output() selected = new EventEmitter<string>();
}

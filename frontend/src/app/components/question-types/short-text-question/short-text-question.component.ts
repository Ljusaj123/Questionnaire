import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AnswerOption } from '@core/models';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-short-text-question',
  imports: [ FormsModule, InputTextModule],
  templateUrl: './short-text-question.component.html',
})
export class ShortTextQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() isAdmin: boolean = true;
  @Input() currentAnswer: string = "";

  @Output() answered = new EventEmitter<string>();
}

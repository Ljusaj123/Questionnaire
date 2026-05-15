
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerOption } from '@core/models';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox-question',
  imports: [CheckboxModule, FormsModule],
  templateUrl: './checkbox-question.component.html',
  standalone: true,
})
export class CheckboxQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() isAdmin: boolean = true;
  @Input() currentAnswer: string[] = [];

  @Output() selected = new EventEmitter<string[]>();
}

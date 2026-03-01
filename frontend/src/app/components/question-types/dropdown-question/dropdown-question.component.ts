import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerOption } from '@core/models';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dropdown-question',
  imports: [SelectModule, FormsModule],
  templateUrl: './dropdown-question.component.html',
})
export class DropdownQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() isAdmin: boolean = true;
  @Input() currentAnswer: string = '';

  @Output() selected = new EventEmitter<string>();
}

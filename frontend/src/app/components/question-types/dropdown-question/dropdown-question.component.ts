import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() showFlag: boolean = true;
  @Output() selected = new EventEmitter<string>();

  public selectedValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.selectedValue = null;
    }
  }

  onSelectionChange(event: any) {
    this.selectedValue = event.value;
    this.selected.emit(event.value);
  }
}

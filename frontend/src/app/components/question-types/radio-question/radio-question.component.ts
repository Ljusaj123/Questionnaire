import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerOption } from '@core/models';

import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radio-question',
  imports: [RadioButtonModule, CommonModule, FormsModule],
  templateUrl: './radio-question.component.html',
})
export class RadioQuestion implements OnChanges {
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

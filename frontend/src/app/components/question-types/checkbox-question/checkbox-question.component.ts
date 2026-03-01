import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AnswerOption } from '@core/models';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox-question',
  imports: [CheckboxModule, CommonModule],
  templateUrl: './checkbox-question.component.html',
  standalone: true,
})
export class CheckboxQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() selected = new EventEmitter<string[]>();

  selectedAnswers: Set<string> = new Set<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.resetAnswers();
    }
  }

  toggle(label: string) {
    if (this.selectedAnswers.has(label)) {
      this.selectedAnswers.delete(label);
    } else {
      this.selectedAnswers.add(label);
    }
    this.selected.emit([...this.selectedAnswers]);
  }

  resetAnswers() {
    this.selectedAnswers.clear();
  }
}

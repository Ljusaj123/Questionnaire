import { Component, effect, input, output, signal } from '@angular/core';
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
  public answers = input<AnswerOption[]>([]);
  public isAdmin = input<boolean>(true);
  public currentAnswer = input<string[]>([]);

  // local mutable state za ngModel
  public selectedAnswers = signal<string[]>([]);

  public answered = output<string[]>();

  constructor() {
    effect(() => {
      this.selectedAnswers.set(this.currentAnswer());
    });
  }

  setAnswerValues(values: string[]) {
    this.selectedAnswers.set(values);
    this.answered.emit(values);
  }
}

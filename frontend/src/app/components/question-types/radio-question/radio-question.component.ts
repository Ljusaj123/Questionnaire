
import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerOption } from '@core/models';

import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-radio-question',
  imports: [RadioButtonModule, FormsModule],
  templateUrl: './radio-question.component.html',
})
export class RadioQuestion {
  public answers = input<AnswerOption[]>([]);
  public isAdmin = input<boolean>(true);
  public currentAnswer = input<string>('');

  public selectedAnswer = signal<string>('');
  public answered = output<string>();

  constructor() {
    effect(() => {
      this.selectedAnswer.set(this.currentAnswer());
    });
  }

  setAnswerValues(value: string) {
    this.selectedAnswer.set(value);
    this.answered.emit(value);
  }
}

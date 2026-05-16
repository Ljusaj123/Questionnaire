import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AnswerOption } from '@core/models';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-short-text-question',
  imports: [ FormsModule, InputTextModule],
  templateUrl: './short-text-question.component.html',
})
export class ShortTextQuestion {
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

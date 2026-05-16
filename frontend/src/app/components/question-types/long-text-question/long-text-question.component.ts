import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnswerOption } from '@core/models';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-long-text-question',
  imports: [TextareaModule, FormsModule],
  templateUrl: './long-text-question.component.html',
})
export class LongTextQuestion {
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

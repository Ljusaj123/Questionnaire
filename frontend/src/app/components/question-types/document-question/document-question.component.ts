import { Component, effect, input, output, signal } from '@angular/core';
import { AnswerOption } from '@core/models';

import {
  FileSelectEvent,
  FileUploadModule,
} from 'primeng/fileupload';

@Component({
  selector: 'app-document-question',
  templateUrl: './document-question.component.html',
  imports: [FileUploadModule],
})
export class DocumentQuestion {
  public answers = input<AnswerOption[]>([]);
  public isAdmin = input<boolean>(true);
  public currentAnswer = input<File | null>(null);
  public localAnswer = signal<File | null>(null);

  public answered = output<File>();

  constructor() {
    effect(() => {
      this.localAnswer.set(this.currentAnswer());
    });
  }

  onFileSelect(event: FileSelectEvent) {
    if (!event.files?.length) return;

    const file = event.files[0];

    this.localAnswer.set(file);
    this.answered.emit(file);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() answers: AnswerOption[] = [];
  @Input() isAdmin: boolean = true;
  @Input() currentAnswer: File | null = null;

  @Output() answered = new EventEmitter<File>();

  onFileSelect(event: FileSelectEvent) {
    if (!event.files?.length) return;

    const file = event.files[0];

    this.currentAnswer = file;
    this.answered.emit(file);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerOption } from '@core/models';

import {
  FileUploadEvent,
  FileUploadModule,
  UploadEvent,
} from 'primeng/fileupload';

@Component({
  selector: 'app-document-question',
  templateUrl: './document-question.component.html',
  imports: [FileUploadModule],
})
export class DocumentQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<File>();

  fileName: string | null = null;

  onFileChange(event: FileUploadEvent) {
    console.log(event);
    if (!event.files || event.files.length === 0) return;
    this.fileName = event.files[0].name;

    const file = event.files[0];

    this.answered.emit(file);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxQuestion } from '../question-types/checkbox-question/checkbox-question.component';
import { RadioQuestion } from '../question-types/radio-question/radio-question.component';
import { ShortTextQuestion } from '../question-types/short-text-question/short-text-question.component';
import { LongTextQuestion } from '../question-types/long-text-question/long-text-question.component';
import { DropdownQuestion } from '../question-types/dropdown-question/dropdown-question.component';
import { DateQuestion } from '../question-types/date-question/date-question.component';
import { DocumentQuestion } from '../question-types/document-question/document-question.component';
import { Question } from '@core/models';
import { ButtonModule } from 'primeng/button';
import { QuestionnaireService } from '@core/questionnaire.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RestResponse } from '@core/rest-response.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-question-item',
  imports: [
    CommonModule,
    CheckboxQuestion,
    RadioQuestion,
    ShortTextQuestion,
    LongTextQuestion,
    DropdownQuestion,
    DateQuestion,
    DocumentQuestion,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './question-item.component.html',
})
export class QuestionItem {
  @Input() question!: Question;
  @Input() sectionId: string = '';

  @Output() selected = new EventEmitter<any>();
  @Input() isAdmin: boolean = true;
  @Input() answer: any

  constructor(
    private questionnaireService: QuestionnaireService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  onAnswerChange(value: any) {
    this.selected.emit(value);
  }

  handleDeleteQuestion(questionId: string) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete question ${questionId}?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes',
      },
      accept: () => {
        this.deleteQuestion(questionId);
      },
      reject: () => {},
    });
  }

  deleteQuestion(questionId: string) {
    this.questionnaireService
      .deleteQuestion(questionId, this.sectionId)
      .subscribe({
        next: (response: RestResponse) => {
          if (response.message === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete question',
              detail: response.data,
            });
            this.questionnaireService.loadSections();
          }
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Delete question',
            detail: error.error.data,
          });
        },
      });
  }
}

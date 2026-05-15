import { Component, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CreateAction, QuestionType, Section } from '@core/models';
import { QuestionnaireService } from '@core/questionnaire.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ContextMenu } from 'src/app/components/context-menu/context-menu';
import { CreateForm } from 'src/app/components/create-form/create-form.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { QuestionItem } from 'src/app/components/question-item/question-item.component';
import { RestResponse } from '@core/rest-response.model';

import { AccordionModule, AccordionTabOpenEvent } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin-page',
  imports: [
    ButtonModule,
    CdkAccordionModule,
    ContextMenu,
    CreateForm,
    CdkMenuModule,
    AccordionModule,
    QuestionItem,
    ConfirmDialog,
    DialogModule,
    FormsModule,
    InputTextModule
],
  providers: [ConfirmationService],
  templateUrl: './admin.component.html',
})
export class Admin implements OnInit {
  private router = inject(Router);
  public questionnaireData: Section[] = [];

  public activeSectionId: string | null = null;
  public showCreateQuestionForm = false;
  public newQuestionId: string | null = null;

  public questionType: QuestionType = '';
  public newSectionLabel: string = '';
  public showCreateSectionDialog: boolean = false;
  public showErrorDialog: boolean = false;
  public sectionsWithoutQuestions: string[] = [];

  constructor(
    private questionnaireService: QuestionnaireService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.questionnaireService.sections$.subscribe((sections) => {
      this.questionnaireData = sections;
    });
  }

  startQuestionnaire() {
    this.sectionsWithoutQuestions = this.questionnaireData
      .filter((section: Section) => {
        return section.questions.length === 0;
      })
      .map((section: Section) => {
        return section.sectionId;
      });
    if (this.sectionsWithoutQuestions.length) {
      this.showErrorDialog = true;
      return;
    }

    this.router.navigateByUrl(`/questionnaire`);
  }

  setActiveSection(event: AccordionTabOpenEvent) {
    const index = event.index;
    const section = this.questionnaireData[index];
    this.activeSectionId = section?.sectionId;
  }

  handleContextMenuAction(action: CreateAction, sectionId: string) {
    if (action.type === 'Section') {
      this.newSectionLabel = '';
      this.showCreateSectionDialog = true;
      return;
    }
    this.questionType = action.questionType;

    if (action.type === 'Question') {
      this.newQuestionId =
        this.questionnaireService.getNextQuestionId(sectionId);

      if (!this.newQuestionId) return;

      this.questionnaireService.setActiveQuestion(
        sectionId,
        this.newQuestionId,
      );
      this.showCreateQuestionForm = true;
    }
  }

  confirmCreateSection() {
    this.questionnaireService.createSection(this.newSectionLabel).subscribe({
      next: (response: RestResponse) => {
        if (response.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Create section',
            detail: response.data,
          });

          this.showCreateSectionDialog = false;
          this.questionnaireService.loadSections();
        }
      },
    });
  }

  closeCreateForm() {
    this.showCreateQuestionForm = false;
  }

  handleDeleteSection(event: any, sectionId: string) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete section ${sectionId}?`,
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
        this.deleteSection(sectionId);
      },
      reject: () => {},
    });
  }

  deleteSection(sectionId: string) {
    this.questionnaireService.deleteSection(sectionId).subscribe({
      next: (response: RestResponse) => {
        if (response.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Delete section',
            detail: response.data,
          });
          this.questionnaireService.loadSections();
        }
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete section',
          detail: error.error.data,
        });
      },
    });
  }
}

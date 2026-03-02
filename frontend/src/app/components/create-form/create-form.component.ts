import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Option } from './option/option.component';
import { QuestionnaireService } from '@core/questionnaire.service';
import { QuestionType } from '@core/models';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RestResponse } from '@core/rest-response.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-form',
  imports: [
    SelectModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    Option,
  ],
  templateUrl: './create-form.component.html',
})
export class CreateForm {
  @Input() questionId: string = '';
  @Input() sectionId: string = '';
  @Input() type: QuestionType = '';

  public conditionOptions: { label: string; value: string }[] = [];
  public questions: { label: string; value: string }[] = [];

  @Output() onCreate = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  public form: FormGroup = this.initializeForm();
  public sectionIds: string[] = [];
  public questionIds: string[] = [];

  get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  get options(): FormArray<FormGroup> {
    return this.form.get('options') as FormArray<FormGroup>;
  }

  constructor(
    private questionnaireService: QuestionnaireService,
    private messageService: MessageService,
  ) {
    this.sectionIds = this.questionnaireService.getAllSectionIds();
  }

  getAvailableConditionOptions(): string[] {
    return this.options.controls.map((option) => option.get('label')?.value);
  }

  hasOptions(type: QuestionType): boolean {
    return ['radio', 'check-boxes', 'drop-down'].includes(type);
  }

  handleSelection(index: number) {
    const type = this.conditions.at(index).get('type')?.value;

    if (type === 'Question') {
      this.questionIds = this.questionnaireService.getQuestionIdsBySection(
        this.sectionId,
      );
    }
  }

  removeOption(index: number): void {
    if (this.options.length > 1) {
      this.options.removeAt(index);
    }
  }

  getTargetsForCondition(index: number) {
    const type = this.conditions.at(index).get('type')?.value;

    if (type === 'Section') {
      return this.sectionIds;
    }

    if (type === 'Question') {
      return this.questionIds;
    }

    return [];
  }

  addCondition(): void {
    this.conditions.push(this.createCondition());
  }

  addOption(): void {
    this.options.push(this.createOption(`Option ${this.options.length + 1}`));
  }

  removeCondition(index: number): void {
    this.conditions.removeAt(index);
  }

  handleCreateQestion() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const newQuestion = {
      questionId: this.questionId,
      label: this.form.get('title')?.value,
      type: this.type,
      answers: this.form.get('options')?.value,
      conditions: this.form.get('conditions')?.value,
    };

    this.questionnaireService
      .createQuestion(newQuestion, this.sectionId)
      .subscribe({
        next: (response: RestResponse) => {
          if (response.message === 'success') {
            this.onCreate.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Create question',
              detail: response.data,
            });

            this.questionnaireService.loadSections();
          }
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Create question',
            detail: error.error.data,
          });
        },
      });
  }

  private initializeForm(): FormGroup {
    return new FormGroup({
      conditions: new FormArray([this.createCondition()]),
      title: new FormControl<string>('', Validators.required),
      options: new FormArray([this.createOption('Option 1')]),
    });
  }

  private createCondition(): FormGroup {
    const group = new FormGroup({
      answerId: new FormControl<string>(''),
      type: new FormControl<'section' | 'question' | null>(null),
      target: new FormControl<string>(''),
    });

    const answerIdCtrl = group.get('answerId')!;
    const typeCtrl = group.get('type')!;
    const targetCtrl = group.get('target')!;

    answerIdCtrl.valueChanges.subscribe((value) => {
      if (value) {
        typeCtrl.setValidators(Validators.required);
        targetCtrl.setValidators(Validators.required);
      } else {
        typeCtrl.clearValidators();
        targetCtrl.clearValidators();

        typeCtrl.reset();
        targetCtrl.reset();
      }

      typeCtrl.updateValueAndValidity({ emitEvent: false });
      targetCtrl.updateValueAndValidity({ emitEvent: false });
    });

    return group;
  }

  private createOption(label: string = ''): FormGroup {
    const isFlagCtrl = new FormControl<boolean>(false);
    const pointsCtrl = new FormControl<number | null>({
      value: null,
      disabled: true,
    });

    const group = new FormGroup({
      label: new FormControl<string>(label, Validators.required),
      isFlag: isFlagCtrl,
      points: pointsCtrl,
    });

    isFlagCtrl.valueChanges.subscribe((isFlag) => {
      if (isFlag) {
        pointsCtrl.enable();
        pointsCtrl.setValidators([Validators.required, Validators.min(0)]);
      } else {
        pointsCtrl.reset(null);
        pointsCtrl.clearValidators();
        pointsCtrl.disable();
      }

      pointsCtrl.updateValueAndValidity();
    });

    return group;
  }
}

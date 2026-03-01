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
import {
  AnswerOption,
  Condition,
  Question,
  QuestionType,
} from '@core/models';

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
    Option
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

  ngOnInit() {
    // this.questionnaireService.activeQuestion$.subscribe((question) => {
    //   if (!question) return;

    //   this.patchForm(question);
    // });

    // this.form.valueChanges.subscribe((value) => {
    //   this.questionnaireService.updateActiveQuestion({
    //     label: value.title,
    //     answers: value.options,
    //     conditions: value.conditions,
    //   });
    // });
  }

  getAvailableConditionOptions(index: number): string[] {
    const usedOptions = this.conditions.controls
      .map((condition, i) =>
        i !== index ? condition.get('option')?.value : null,
      )
      .filter(Boolean);

    return this.options.controls
      .map((option) => option.get('label')?.value)
      .filter((label) => !usedOptions.includes(label));
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

  isLast(index: number): boolean {
    return index === this.conditions.length - 1;
  }

  handleCreateQestion() {
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
    return new FormGroup({
      answerId: new FormControl<string>('', Validators.required),
      type: new FormControl<'section' | 'question' | null>(
        null,
        Validators.required,
      ),
      target: new FormControl<string>('', Validators.required),
    });
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
      pointsCtrl.updateValueAndValidity({ emitEvent: false });
    });

    return group;
  }

  // private patchForm(question: Question) {
  //   this.form.reset();

  //   this.form.get('question.title')?.setValue(question.label);

  //   this.options.clear();

  //   question.answers.forEach((answer: AnswerOption) => {
  //     this.options.push(
  //       new FormGroup({
  //         label: new FormControl(answer.label, Validators.required),
  //         isFlag: new FormControl(answer.isFlag ?? false),
  //         points: new FormControl(answer.points ?? null),
  //       }),
  //     );
  //   });

  //   this.conditions.clear();

  //   (question.conditions ?? []).forEach((condition: Condition) => {
  //     this.conditions.push(
  //       new FormGroup({
  //         answerId: new FormControl(condition.answerId),
  //         type: new FormControl(condition.type),
  //         target: new FormControl(condition.target),
  //       }),
  //     );
  //   });
  // }
}

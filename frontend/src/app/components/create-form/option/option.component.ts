import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '@core/models';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    FileUploadModule,
    ButtonModule,
    CommonModule
],
  templateUrl: './option.component.html',
})
export class Option {
  @Input() type: QuestionType = '';
  @Input() formGroup!: FormGroup;
  @Input() canRemove = false;

  @Output() remove = new EventEmitter<void>();

  ngOnChanges() {
    if (this.isStaticFlagType()) {
      this.formGroup.get('isFlag')?.setValue(true);
    }
  }

  private isStaticFlagType(): boolean {
    return ['short-text', 'long-text', 'date', 'document'].includes(this.type);
  }

  hasOptions(type: QuestionType): boolean {
    return ['radio', 'check-boxes', 'drop-down'].includes(type);
  }
}

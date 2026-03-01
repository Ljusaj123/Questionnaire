import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionType } from '@core/models';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-option',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DatePickerModule,
    InputNumberModule
],
  templateUrl: './option.component.html',
})
export class Option {
  @Input() type: QuestionType = '';
  @Input() formGroup!: FormGroup;

  hasOptions(type: QuestionType): boolean {
    return ['radio', 'check-boxes', 'drop-down'].includes(type);
  }
}

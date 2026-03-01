import {
  Component,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CreateAction, QuestionType } from '@core/models';

import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CdkMenuModule, DividerModule, CommonModule],
  templateUrl: './context-menu.html',
})
export class ContextMenu {
  @ViewChild('contextMenu', { static: true })
  public contextMenu!: TemplateRef<CdkMenuModule>;
  @Input() showQuestionOption: boolean = false;

  @Output() action = new EventEmitter<CreateAction>();

  createSection() {
    this.action.emit({ type: 'section', questionType: '' });
  }

  createQuestion(type: QuestionType) {
    this.action.emit({ type: 'question', questionType: type });
  }
}

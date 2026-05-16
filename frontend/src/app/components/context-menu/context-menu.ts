import {
  Component,
  ViewChild,
  TemplateRef,
  input,
  output,
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
  public showQuestionOption = input<boolean>(false);

  public action = output<CreateAction>();

  createSection() {
    this.action.emit({ type: 'Section', questionType: '' });
  }

  createQuestion(type: QuestionType) {
    this.action.emit({ type: 'Question', questionType: type });
  }
}

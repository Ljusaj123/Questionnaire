import { Component, ViewChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CreateAction, QuestionType } from '@core/models';

import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CdkMenuModule, DividerModule],
  templateUrl: './context-menu.html',
})
export class ContextMenu {
  @ViewChild('contextMenu', { static: true })

  public contextMenu!: TemplateRef<CdkMenuModule>;
  
  @Output() action = new EventEmitter<CreateAction>();

  createSection() {
    this.action.emit({ type: 'section',  questionType: ''});
  }

  createQuestion(type: QuestionType) {
    this.action.emit({ type: 'question', questionType: type });
  }
}

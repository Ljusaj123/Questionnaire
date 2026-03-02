import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Condition, Question, Section } from '@core/models';

import { QuestionItem } from 'src/app/components/question-item/question-item.component';

import { ButtonModule } from 'primeng/button';
import { QuestionnaireService } from '@core/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  imports: [CommonModule, ButtonModule, QuestionItem],
  templateUrl: './questionnaire.component.html',
})
export class Questionnaire {
  public currentSectionIndex: number = 0;
  public currentQuestionIndex: number = 0;
  public history: { section: number; question: number }[] = [];
  public answersState = new Map<string, string | string[]>();

  public questionnaireData: Section[] = [];
  public showError: boolean = false;

  constructor(private questionnaireService: QuestionnaireService) {}

  ngOnInit(): void {
    this.questionnaireService.sections$.subscribe((sections) => {
      this.questionnaireData = sections;
    });
  }

  get currentQuestion() {
    return this.questionnaireService.getCurrentQuestion(
      this.currentSectionIndex,
      this.currentQuestionIndex,
    );
  }

  get currentAnswer() {
    return this.answersState.get(this.getKey());
  }

  onAnswerChange(value: any) {
    const key = this.getKey();
    this.answersState.set(key, value);
  }

  private getKey(): string {
    const section = this.questionnaireData[this.currentSectionIndex];
    return `${section.sectionId}_${this.currentQuestion.questionId}`;
  }

  goNext() {
    const answer = this.answersState.get(this.getKey());
    if (!answer) {
      this.showError = true;
      return;
    } else this.showError = false;

    const currentHistoryEntry = {
      section: this.currentSectionIndex,
      question: this.currentQuestionIndex,
    };

    const lastHistory = this.history[this.history.length - 1];
    if (
      !lastHistory ||
      lastHistory.section !== currentHistoryEntry.section ||
      lastHistory.question !== currentHistoryEntry.question
    ) {
      this.history.push(currentHistoryEntry);
    }
    const conditions = this.currentQuestion.conditions;

    if (!conditions || !conditions.length) {
      this.defaultNext();
      return;
    }

    console.log(conditions)
    console.log(answer)

    const matchedConditions = conditions.filter((condition: Condition) =>
      Array.isArray(answer)
        ? answer.includes(condition.answerId)
        : condition.answerId === answer,
    );

    console.log(matchedConditions)

    if (matchedConditions.length === 1) {
      this.navigateByCondition(matchedConditions[0]);
    } else {
      this.defaultNext();
    }
  }

  defaultNext() {
    const currentSection = this.questionnaireService.getCurrentSection(
      this.currentSectionIndex,
    );

    if (this.currentQuestionIndex < currentSection.questions.length - 1) {
      this.currentQuestionIndex++;
    } else if (this.currentSectionIndex < this.questionnaireData.length - 1) {
      this.currentSectionIndex++;
      this.currentQuestionIndex = 0;
    }
  }

  goBack() {
    const prev = this.history.pop();
    if (!prev) return;

    this.currentSectionIndex = prev.section;
    this.currentQuestionIndex = prev.question;
  }

  navigateByCondition(condition: Condition) {
    console.log(condition)
    if (condition.type === 'Section') {
      const sectionIndex = this.questionnaireData.findIndex(
        (section) => section.sectionId === condition.target,
      );

      console.log(sectionIndex)

      if (sectionIndex != -1) {
        this.currentSectionIndex = sectionIndex;
        this.currentQuestionIndex = 0;
      }
    }

    if (condition.type === 'Question') {
      const currentSection = this.questionnaireService.getCurrentSection(
        this.currentSectionIndex,
      );
      const questionIndex = currentSection.questions.findIndex(
        (question: Question) => question.questionId === condition.target,
      );
      if (questionIndex != -1) {
        this.currentQuestionIndex = questionIndex;
      }
    }
  }
}

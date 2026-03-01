import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, Section } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RestResponse } from './rest-response.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private activeQuestionSubject = new BehaviorSubject<Question | null>(null);
  public activeQuestion$ = this.activeQuestionSubject.asObservable();

  private sectionsSubject = new BehaviorSubject<Section[]>([]);
  readonly sections$ = this.sectionsSubject.asObservable();

  public activeSection: string = '';

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.loadSections();
  }

  private get sections(): Section[] {
    return this.sectionsSubject.value;
  }

  loadSections() {
    this.http
      .get<RestResponse>(`${this.apiUrl}/sections`)
      .subscribe((response) => {
        if (response.message === 'success') {
          this.sectionsSubject.next(response.data);
        }
      });
  }

  createSection() {
    const sections = this.sections;
    const lastId = sections.at(-1)?.sectionId ?? 'S-000';

    const section: Section = {
      sectionId: this.nextId(lastId),
      label: 'New section',
      questions: [],
    };
    return this.http.post<RestResponse>(`${this.apiUrl}/sections`, { section });
  }

  deleteSection(sectionId: string) {
    return this.http.delete<RestResponse>(
      `${this.apiUrl}/sections/${sectionId}`,
    );
  }

  createQuestion(question: Question, sectionId: string) {
    return this.http.post<RestResponse>(`${this.apiUrl}/questions`, {
      question,
      sectionId,
    });
  }

  deleteQuestion(questionId: string, sectionId: string) {
    return this.http.delete<RestResponse>(
      `${this.apiUrl}/questions/${sectionId}/${questionId}`,
    );
  }

  getAllSectionIds(): string[] {
    return this.sections.map((section: Section) => section.sectionId);
  }

  getQuestionIdsBySection(sectionId: string): string[] {
    const section = this.sections.find(
      (section: Section) => section.sectionId === sectionId,
    );

    if (!section) {
      return [];
    }

    return section.questions.map((question: Question) => question.questionId);
  }

  getNextQuestionId(activeSectionId: string) {
    const section = this.sections.find(
      (section: Section) => section.sectionId === activeSectionId,
    );
    if (!section) return null;

    const lastQuestionId =
      section.questions[section.questions.length - 1]?.questionId;

    let nextQuestionId;

    if (!lastQuestionId) nextQuestionId = 'Q-001';
    else nextQuestionId = this.nextId(lastQuestionId);

    return nextQuestionId;
  }

  removeEditingMode(): void {
    this.sections.forEach((section: Section) => {
      section.questions.forEach((question: Question) => {
        delete question.isEditing;
      });
    });
  }

  setActiveQuestion(sectionId: string, questionId: string): void {
    const section = this.sections.find(
      (section: Section) => section.sectionId === sectionId,
    );
    this.activeSection = sectionId;
    if (!section) return;

    const question = section.questions.find(
      (question: Question) => question.questionId === questionId,
    );
    if (!question) return;

    this.activeQuestionSubject.next(question);
  }

  updateActiveQuestion(patch: Partial<Question>): void {
    const current = this.activeQuestionSubject.value;
    if (!current) return;

    const updated = { ...current, ...patch };
    this.syncToStore(updated);
  }

  getCurrentQuestion(
    currentSectionIndex: number,
    currentQuestionIndex: number,
  ) {
    return this.sections[currentSectionIndex]?.questions[currentQuestionIndex] ?? null;
  }

  getCurrentSection(currentSectionIndex: number) {
    return this.sections[currentSectionIndex];
  }

  private syncToStore(updated: Question): void {
    const section = this.sections.find(
      (section: Section) => section.sectionId === this.activeSection,
    );
    if (!section) return;

    const index = section.questions.findIndex(
      (question: Question) => question.questionId === updated.questionId,
    );

    if (index !== -1) {
      section.questions[index] = updated;
      return;
    }
  }

  private nextId(lastId: string): string {
    const [prefix, num] = lastId.split('-');

    const next = Number(num) + 1;

    return `${prefix}-${next.toString().padStart(num.length, '0')}`;
  }
}

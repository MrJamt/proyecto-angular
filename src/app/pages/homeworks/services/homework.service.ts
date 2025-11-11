import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homework } from '../interfaces/homework.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  private httprequest = inject(HttpClient);

  public url: string = 'http://localhost:3000/homeworks';

  constructor() { }

  getHomeworks(): Observable<Homework[]> {
    return this.httprequest.get<Homework[]>(this.url);
  }

  getHomeworkById(id: number): Observable<Homework> {
    return this.httprequest.get<Homework>(`${this.url}/${id}`);
  }

  createHomework(homework: Homework): Observable<Homework> {
    return this.httprequest.post<Homework>(this.url, homework);
  }

  updateHomework(id: number, homework: Homework): Observable<Homework> {
    return this.httprequest.put<Homework>(`${this.url}/${id}`, homework);
  }

  deleteHomework(id: number): Observable<void> {
    return this.httprequest.delete<void>(`${this.url}/${id}`);
  }
}

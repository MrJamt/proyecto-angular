import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeworkService } from '../../services/homework.service';
import { Observable } from 'rxjs';
import { Homework } from '../../interfaces/homework.interface';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-homework-list',
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: './homework-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeworkList { 
  private homeworkService = inject(HomeworkService);
  private router = inject(Router);

  public homeworks$: Observable<Homework[]> = this.homeworkService.getHomeworks();
  public isDeleting = signal<number | null>(null);

  onAddHomework(): void {
    this.router.navigate(['/homeworks/create-homework']);
  }

  onEditHomework(id: number): void {
    this.router.navigate(['/homeworks', id]);
  }

  onDeleteHomework(id: number): void {
    if (confirm('¿Deseas eliminar esta tarea?')) {
      this.isDeleting.set(id);

      this.homeworkService.deleteHomework(id).subscribe({
        next: () => {
          this.homeworks$ = this.homeworkService.getHomeworks();
          this.isDeleting.set(null);
        },
        error: (error) => {
          console.error('Error eliminando tareas:', error);
          this.isDeleting.set(null);
          alert('Error al eliminar tareas');
        }
      });
    }
  }
}
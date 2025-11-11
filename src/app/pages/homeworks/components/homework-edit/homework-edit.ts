import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeworkService } from '../../services/homework.service';
import { Status } from '../../interfaces/homework.interface';

@Component({
  selector: 'app-homework-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './homework-edit.html',
})
export default class HomeworkEdit implements OnInit {
  private fb = inject(FormBuilder);
  private homeworkService = inject(HomeworkService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public homeworkForm: FormGroup;
  public status = Object.values(Status);
  public isSubmitting = false;
  public isLoading = true;
  public homeworkId: number = 0;

  constructor() {
    this.homeworkForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      due_date: ['', [Validators.required]],
      status: [Status.PENDING, [Validators.required]],
    })
  }
  
    ngOnInit(): void {
    this.homeworkId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.homeworkId) {
      this.loadHomework();
    }
  }

  loadHomework(): void {
    this.homeworkService.getHomeworkById(this.homeworkId).subscribe({
      next: (homework) => {
        if (homework) {
          this.homeworkForm.patchValue(homework);
          this.isLoading = false;
        } else {
          this.router.navigate(['/homeworks']);
        }
      },
      error: (error) => {
        console.error('Error cargando tareas:', error);
        this.router.navigate(['/homeworks']);
      }
    });
  }

  onSubmit(): void {
    if (this.homeworkForm.valid) {
      this.isSubmitting = true;

      this.homeworkService.updateHomework(this.homeworkId, this.homeworkForm.value).subscribe({
        next: () => {
          this.router.navigate(['/homeworks']);
        },
        error: (error) => {
          console.error('Error actualizando tareas:', error);
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.homeworkForm.controls).forEach(key => {
        this.homeworkForm.get(key)?.markAsTouched();
      });
    }
  }

   onCancel(): void {
    this.router.navigate(['/homeworks']);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.homeworkForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${fieldName} es requerido`;
    }

    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${fieldName} debe tener al menos ${minLength} caracteres`;
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.homeworkForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}

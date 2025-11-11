import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeworkService } from '../../services/homework.service';
import { Router } from '@angular/router';
import { Status } from '../../interfaces/homework.interface';

@Component({
  selector: 'app-homework-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './homework-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeworkCreate {
  private fb = inject(FormBuilder);
  private homeworkService = inject(HomeworkService);
  private router = inject(Router);

  public homeworkForm: FormGroup;
  public statuses = Object.values(Status);
  public isSubmitting = false;

  constructor() {
    this.homeworkForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      due_date: ['', [Validators.required]],
      status: [Status.PENDING, [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.homeworkForm.valid) {
      this.isSubmitting = true;

      this.homeworkService.getNextId().subscribe(nextId => {
        const formValue = {
          ...this.homeworkForm.value,
          id: nextId
        };

        this.homeworkService
          .createHomework(formValue)
          .subscribe({
            next: () => {
              this.router.navigate(['/homeworks']);
            },
            error: (err) => {
              console.log('Error al crear tarea', err);
              this.isSubmitting = false;
            }
          });
      });
    }
  }

  onCancel(): void{
    this.router.navigate(['/homeworks']);
  }

  getErrorMessage(fieldname: string): string{
    const control = this.homeworkForm.get(fieldname);

    if(control?.hasError('required')){
      return `${fieldname} es requerido`
    }

    if (control?.hasError('minLength')){
      const minLength = control.errors?.['minLength'].requiredLength;
      return `${fieldname} debe tener al menor ${minLength} caracteres`;
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean{
    const control = this.homeworkForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}

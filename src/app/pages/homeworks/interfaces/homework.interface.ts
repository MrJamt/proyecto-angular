export interface HomeworkResponse {
  homeworks: Homework[];
}

export interface Homework {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  status: Status;
} 

export enum Status {
  PENDING = 'Pendiente',
  IN_PROGRESS = 'En progreso',
  COMPLETED = 'Completado'  
}
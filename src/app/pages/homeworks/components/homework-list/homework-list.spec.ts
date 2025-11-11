import { ComponentFixture, TestBed } from "@angular/core/testing";
import HomeworkList from "./homework-list";
import { HomeworkService } from "../../services/homework.service";
import { Router } from "@angular/router";
import { Status } from "../../interfaces/homework.interface";
import { of } from "rxjs";

describe('HomeworkList Component', () => {
  let component: HomeworkList;
  let fixture: ComponentFixture<HomeworkList>;
  let homeworkService: jasmine.SpyObj<HomeworkService>;
  let router: jasmine.SpyObj<Router>;

  const mockHomeworks = [
    {
      id: 1,
      title: 'Tarea 1',
      description: 'Descripción de la tarea 1',
      due_date: new Date('2025-11-12'),
      status: Status.PENDING
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      due_date: new Date('2025-11-13'),
      status: Status.IN_PROGRESS
    }
  ];

  beforeEach(async () => {
    const homeworkServiceSpy = jasmine.createSpyObj('HomeworkService', ['getHomeworks', 'deleteHomework']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeworkList],
      providers: [
        { provide: HomeworkService, useValue: homeworkServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    homeworkService = TestBed.inject(HomeworkService) as jasmine.SpyObj<HomeworkService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    homeworkService.getHomeworks.and.returnValue(of(mockHomeworks));

    fixture = TestBed.createComponent(HomeworkList);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load homeworks on initialization', (done) => {
    fixture.detectChanges();

    component.homeworks$.subscribe(homeworks => {
      expect(homeworks).toEqual(mockHomeworks);
      expect(homeworks.length).toBe(2);
      expect(homeworkService.getHomeworks).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should navigate to create homework page when onAddHomework is called', () => {
    component.onAddHomework();
    expect(router.navigate).toHaveBeenCalledWith(['/homeworks/create-homework']);
  });

  it('should navigate to edit homework page with correct id when onEditHomework is called', () => {
    const homeworkId = 2;
    component.onEditHomework(homeworkId);
    expect(router.navigate).toHaveBeenCalledWith(['/homeworks/edit-homework', homeworkId]);
  });

  it('should delete homework successfully when confirmed', (done) => {
    const homeworkIdToDelete = 1;
    const updatedHomeworks = mockHomeworks.filter(h => h.id !== homeworkIdToDelete);
    spyOn(window, 'confirm').and.returnValue(true);

    homeworkService.deleteHomework.and.returnValue(of(void 0));
    homeworkService.getHomeworks.and.returnValue(of(updatedHomeworks));
    component.onDeleteHomework(homeworkIdToDelete);
    expect(window.confirm).toHaveBeenCalledWith('¿Deseas eliminar esta tarea?');
    expect(homeworkService.deleteHomework).toHaveBeenCalledWith(homeworkIdToDelete);
    expect(component.isDeleting()).toBeNull();
    component.homeworks$.subscribe(homework => {
      expect(homework.length).toBe(1);
      expect(homeworkService.getHomeworks).toHaveBeenCalledTimes(2);
      done();
    })
  });

  it('should not delete homework when confirmation is cancelled', () => {
    const homeworkIdToDelete = 1;
    spyOn(window, 'confirm').and.returnValue(false);
    component.onDeleteHomework(homeworkIdToDelete);
    expect(homeworkService.deleteHomework).not.toHaveBeenCalled();
  });
})
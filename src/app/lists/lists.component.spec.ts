import { AppModule } from './../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsComponent } from './lists.component';
import { of } from 'rxjs/internal/observable/of';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';

fdescribe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async () => {
    let taskSpy = jasmine.createSpyObj('TaskService', ['getAllTasks']);
    taskSpy.getAllTasks.and.returnValue(
      of([
        {
          id: 1,
          title: 'test title',
          description: 'tessssst desc',
          status: 'Todo',
        },
      ])
    );
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: TaskService, useValue: taskSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get only the todos form the tasks array', () => {
    component.getTodos(component.tasks);
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].status).toBe('Todo');
  });

  it('should get only the progress form the tasks array', () => {
    component.getProgress(component.tasks);
    expect(component.progress.length).toBe(0);
  });

  it('should get only the done form the tasks array', () => {
    component.getDone(component.tasks);
    expect(component.done.length).toBe(0);
  });
});

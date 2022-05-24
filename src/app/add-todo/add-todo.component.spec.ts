import { TaskService } from './../services/task.service';
import { AppModule } from './../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    let taskSpy = jasmine.createSpyObj('TaskService', ['addTask']);
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: TaskService, useValue: taskSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

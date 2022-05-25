import { AppModule } from './../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs/internal/observable/of';

fdescribe('EditComponent', () => {
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
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
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
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    component.data = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { By } from '@angular/platform-browser';
import { TaskService } from './../services/task.service';
import { AppModule } from './../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

fdescribe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let el: DebugElement;

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
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.data = 1;

    fixture.detectChanges();
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
  it('should display the page successfully', () => {
    let title = el.query(By.css('.title h1')).nativeElement.innerText;
    let desc = el.query(By.css('.desc')).nativeElement.innerText;
    expect(title).toBe(component.task.title);
    expect(desc).toBe(component.task.description);
  });
});

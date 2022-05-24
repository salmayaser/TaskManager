import { By } from '@angular/platform-browser';
import { AppModule } from './../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponent } from './delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { DebugElement } from '@angular/core';

fdescribe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    let taskSpy = jasmine.createSpyObj('TaskService', ['getAllTasks']);
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
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display confirm dialog successfully', () => {
    let title = el.query(By.css('.title')).nativeElement.innerText;
    let content = el.query(By.css('.content')).nativeElement.innerText;
    expect(title).toBe('Confirm Action');
    expect(content).toBe('Are you sure you want to delete this task');
  });
});

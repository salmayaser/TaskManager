import { TaskService } from './../services/task.service';
import { Task } from './../models/task';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  public titleCtrl: FormControl;
  public descCtrl: FormControl;
  public newTaskId: number;

  constructor(
    public taskService: TaskService,
    public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public tasksLength: number
  ) {}

  ngOnInit(): void {
    this.titleCtrl = new FormControl('', [Validators.required]);
    this.descCtrl = new FormControl('', [Validators.required]);
  }

  addNewTask() {
    this.newTaskId = this.tasksLength + 1;

    let task: Task = {
      id: this.newTaskId,
      title: this.titleCtrl.value,
      description: this.descCtrl.value,
      status: 'Todo',
    };
    this.taskService.addNewTask(task);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

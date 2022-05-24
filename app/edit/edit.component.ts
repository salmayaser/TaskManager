import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public titleCtrl: FormControl;
  public descCtrl: FormControl;
  public task: Task;

  constructor(
    public taskService: TaskService,
    public dialogRef: MatDialogRef<AddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((res) => {
      this.task = res.find((task) => {
        return task.id === this.data;
      });
    });

    this.titleCtrl = new FormControl(this.task.title, [Validators.required]);
    this.descCtrl = new FormControl(this.task.description, [
      Validators.required,
    ]);
  }

  editTask() {
    let task: Task = {
      id: this.task.id,
      title: this.titleCtrl.value,
      description: this.descCtrl.value,
      status: this.task.status,
    };
    this.taskService.updateTasks(task);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

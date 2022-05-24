import { TaskService } from './../services/task.service';
import { Task } from './../models/task';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  public task: Task;
  constructor(
    public taskService: TaskService,
    public dialogRef: MatDialogRef<ViewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((res) => {
      this.task = res.find((task) => {
        return task.id == this.data;
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

import { DeleteComponent } from './../delete/delete.component';
import { Task } from './../models/task';
import { TaskService } from './../services/task.service';
import { ViewTaskComponent } from './../view-task/view-task.component';
import { AddTodoComponent } from './../add-todo/add-todo.component';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  public todos: Task[];
  public progress: Task[];
  public done: Task[];
  public tasks: Task[];
  public currentId: null | number = null;

  constructor(public dialog: MatDialog, public taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTasks(event);
    }
  }

  openDialog() {
    this.dialog.open(AddTodoComponent, {
      minWidth: '50%',

      data: this.tasks.length,
    });
  }

  openView() {
    this.dialog.open(ViewTaskComponent, {
      minWidth: '50%',
      data: this.currentId,
    });
  }
  openEdit() {
    this.dialog.open(EditComponent, {
      minWidth: '50%',
      data: this.currentId,
    });
    console.log(this.currentId);
  }
  openDelete() {
    this.dialog.open(DeleteComponent, {
      minWidth: '500px',
      data: this.currentId,
    });
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe((res) => {
      this.tasks = res;
      this.getTodos(res);
      this.getProgress(res);
      this.getDone(res);
    });
  }
  getTodos(res: Task[]) {
    this.todos = res.filter((todo) => {
      return todo.status == 'Todo';
    });
  }
  getProgress(res: Task[]) {
    this.progress = res.filter((todo) => {
      return todo.status == 'Progress';
    });
  }
  getDone(res: Task[]) {
    this.done = res.filter((todo) => {
      return todo.status == 'Done';
    });
  }

  updateTasks(event: CdkDragDrop<string[]>) {
    let newStatus: string;

    let task: any = event.container.data[event.currentIndex];

    if (event.container.id == 'cdk-drop-list-0') {
      newStatus = 'Todo';
    }
    if (event.container.id == 'cdk-drop-list-1') {
      newStatus = 'Progress';
    }
    if (event.container.id == 'cdk-drop-list-2') {
      newStatus = 'Done';
    }

    this.taskService.updateTasks({ ...task, status: newStatus });
  }
}

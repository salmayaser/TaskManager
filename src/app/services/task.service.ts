import { Task } from '../models/task';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {
    this.tasks$.subscribe((res) => {
      localStorage.setItem('tasks', JSON.stringify(res));
    });
  }
  private storedTasks = JSON.parse(localStorage.getItem('tasks'));
  private tasks = this.storedTasks
    ? this.storedTasks
    : [
        {
          id: 1,
          title: 'delectus aut autem',
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem eum minima
    ducimus, odio perspiciatis architecto ipsum iure recusandae natus pariatur
    illo soluta similique facere corrupti. Consequuntur ad quisquam atque saepe.`,
          status: 'Todo',
        },

        {
          id: 2,
          title: 'fugiat veniam minus',
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem eum minima
    ducimus, odio perspiciatis architecto ipsum iure recusandae natus pariatur
    illo soluta similique facere corrupti. Consequuntur ad quisquam atque saepe.`,
          status: 'Progress',
        },
        {
          id: 3,
          title: 'et porro tempora',
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem eum minima
    ducimus, odio perspiciatis architecto ipsum iure recusandae natus pariatur
    illo soluta similique facere corrupti. Consequuntur ad quisquam atque saepe.`,
          status: 'Done',
        },
        {
          id: 4,
          title: 'et porro tempora',
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem eum minima
    ducimus, odio perspiciatis architecto ipsum iure recusandae natus pariatur
    illo soluta similique facere corrupti. Consequuntur ad quisquam atque saepe.`,
          status: 'Done',
        },
        {
          id: 5,
          title: 'et porro tempora',
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem eum minima
    ducimus, odio perspiciatis architecto ipsum iure recusandae natus pariatur
    illo soluta similique facere corrupti. Consequuntur ad quisquam atque saepe.`,
          status: 'Done',
        },
        {
          id: 6,
          title: 'et porro tempora',
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem eum minima
    ducimus, odio perspiciatis architecto ipsum iure recusandae natus pariatur
    illo soluta similique facere corrupti. Consequuntur ad quisquam atque saepe.`,
          status: 'Todo',
        },
        {
          id: 7,
          title: 'et porro tempora',
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem eum minima
    ducimus, odio perspiciatis architecto ipsum iure recusandae natus pariatur
    illo soluta similique facere corrupti. Consequuntur ad quisquam atque saepe.`,
          status: 'Todo',
        },
      ];

  public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(this.tasks);

  getAllTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addNewTask(newTask: Task) {
    const currentTasks = this.tasks$.value;
    this.tasks$.next([...currentTasks, newTask]);
  }

  updateTasks(updatedTask) {
    const currentTasks = this.tasks$.value;
    let updatedTasks = currentTasks.map((task) => {
      if (task.id == updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    this.tasks$.next(updatedTasks);
  }

  deleteTask(id: number) {
    let currentTasks = this.tasks$.value;
    let newTasks = currentTasks.filter((task) => {
      return task.id != id;
    });
    this.tasks$.next(newTasks);
  }
}

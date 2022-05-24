import { TestBed } from "@angular/core/testing";

import { TaskService } from "./task.service";

describe("TaskServiceService", () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should add new task ", () => {
    service.tasks$.next([]);
    let newTask = {
      id: 6,
      title: "test title",
      description: "test desc",
      status: "todo",
    };
    service.addNewTask(newTask);
    let tasks = service.tasks$.value;
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(6);
  });

  it("should update tasks", () => {
    service.tasks$.next([
      {
        id: 1,
        title: "test",
        description: "test",
        status: "Todo",
      },
    ]);
    let updatedTask = { ...service.tasks$.value[0], status: "Done" };
    service.updateTasks(updatedTask);
    expect(service.tasks$.value[0].status).toBe("Done");
  });

  it("should delete task", () => {
    service.tasks$.next([
      {
        id: 1,
        title: "test",
        description: "test",
        status: "Todo",
      },
    ]);
    service.deleteTask(1);
    expect(service.tasks$.value.length).toBe(0);
  });
});

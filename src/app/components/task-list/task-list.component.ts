import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  
  currentDate = new Date();
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  name: string = "";
  description: string = "";

  guidelines: string = '/guidelines'; //if you want to dynamically change the address

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;

    localStorage.setItem("user", JSON.stringify({
      id: 0,
      name: "megatroon",
      email: "megatroon@gmail.com",
      password: "megatroon"
    }))
  }

  addTask() {
    const obj = {
      id: this.tasks.length + 1,
      name: this.name,
      description: this.description,
      dueDate: new Date(),
      status: false
    };

    this.filteredTasks = [...this.filteredTasks, obj];
    
    // for angular to see changes please you ... spread operator and push operator it wont understand it

    console.log(this.filteredTasks);

    this.taskService.addTask(
    {
      id: this.tasks.length + 1,
      name: this.name,
      description: this.description,
      dueDate: new Date(),
      status: false
    }
  );
  }

  showAll() {
    this.filteredTasks = this.tasks;
  }

  showCompleted() {
    this.filteredTasks = this.tasks.filter((task) => task.status);
  }


  showPending() {
    this.filteredTasks = this.tasks.filter((task) => !task.status);
  }

  toggleStatus(id: number) {
    this.taskService.changeTaskStatus(id);
  }

}

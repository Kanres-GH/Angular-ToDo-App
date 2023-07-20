import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {

    todoForm !: FormGroup;

    tasks : ITask [] = [];
    status : ITask [] = [];
    done : ITask [] = [];
    updateIndex : any;
    isEditEnabled : boolean = false;

    // formArray : any [] = [this.taskID, this.tasks, this.status];
    constructor(private fb : FormBuilder) { }

    ngOnInit(): void {
      this.todoForm = this.fb.group({
        item : ['', Validators.required]
      })
    }

    addTask(){
      this.tasks.push({
        description: this.todoForm.value.item,
        done: false,
        status: "Pending",
        id: 1
      })
      this.todoForm.reset();
    }

    updateTask(){
      this.tasks[this.updateIndex].description = this.todoForm.value.item;
      this.tasks[this.updateIndex].done = false;
      this.todoForm.reset();
      this.updateIndex = undefined;
      this.isEditEnabled = false;

    }

    deleteTask(i : number) {
      this.tasks.splice(i, 1)
    }
    deleteStatusTask(i : number) {
      this.status.splice(i, 1)
    }
    deleteDoneTask(i : number) {
      this.status.splice(i, 1)
    }

    onEdit(item: ITask, i : number){
      this.todoForm.controls['item'].setValue(item.description);
      this.updateIndex = i;
      this.isEditEnabled = true;
    }
    drop(event: CdkDragDrop<ITask[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
}

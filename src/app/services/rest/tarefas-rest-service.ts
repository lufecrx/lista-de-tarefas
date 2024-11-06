import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskItem } from 'src/app/model/tarefa/tarefa.interface';

@Injectable({
  providedIn: 'root',
})
export class TarefasRestService {
  private basePath = '/listadetarefas'; // Caminho para a coleção de dados no Firebase
  private itemsRef: AngularFireList<any> | undefined; // Referência para a lista de itens

  constructor(
    private db: AngularFireDatabase,
  ) {
    this.itemsRef = db.list(
      `${this.basePath}/tarefas`
    );
  }

  // Get all tasks from the database
  getTarefas(): Observable<any[]> {
    if (this.itemsRef) {
      return this.itemsRef.snapshotChanges().pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    } else {
      // If the items reference is not defined, create a new one
      this.itemsRef = this.db.list(
        `${this.basePath}/tarefas`
      );
      return this.itemsRef.snapshotChanges().pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    }
  }

  // Get task paginated
  getTarefasPaginadas(page: number, pageSize: number): Observable<any[]> {
    if (this.itemsRef) {
      return this.itemsRef.snapshotChanges().pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        ),
        map((items) =>
          items.slice((page - 1) * pageSize, page * pageSize)
        )
      );
    } else {
      // If the items reference is not defined, create a new one
      this.itemsRef = this.db.list(
        `${this.basePath}/tarefas`
      );
      return this.itemsRef.snapshotChanges().pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        ),
        map((items) =>
          items.slice((page - 1) * pageSize, page * pageSize)
        )
      );
    }
  }

  // Get a single task by key
  getTarefaPelaChave(key: string): Promise<TaskItem> {
    return new Promise((resolve, reject) => {
      if (this.itemsRef) {
        this.itemsRef
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .subscribe((items) => {
            const activity = items.find((item) => item.key === key);
            if (activity) {
              resolve(activity);
            } else {
              reject('Task not found.');
            }
          });
      } else {
        console.error('Items reference is not defined.');
        reject('Items reference is not defined.');
      }
    });
  }

  // Add a new task and return the key of the new task
  addTarefa(item: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.itemsRef) {
        this.itemsRef
          .push(item)
          .then((ref) => {
            if (ref.key) {
              resolve(ref.key); // Resolve the promise with the key of the new task
            } else {
              reject('Key is null.'); // Reject the promise if the key is null
            }
          })
          .catch((error) => {
            console.error('Error adding task:', error);
            reject(error); // Reject the promise if there was an error
          });
      } else {
        console.error('Items reference is not defined.');
        reject('Items reference is not defined.'); // Reject the promise if itemsRef is not defined
      }
    });
  }

  // Update an existing item
  atualizarTarefa(key: string, value: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.itemsRef) {
        this.itemsRef
          .update(key, value)
          .then(() => {
            resolve(key);
          })
          .catch((error) => {
            console.error('Error updating task:', error);
            reject(error);
          });
      } else {
        console.error('Items reference is not defined.');
        reject('Items reference is not defined.');
      }
    });
  }

  // Delete an task
  deletarTarefa(key: string): void {
    if (this.itemsRef) {
      this.itemsRef.remove(key);
    }
  }

  // Update the order of the tasks
  atualizarOrdemDasTarefas(tarefas: TaskItem[]): Observable<any> {
    return new Observable((observer) => {
      if (this.itemsRef) {
        tarefas.forEach((tarefa, index) => {
          if (this.itemsRef && tarefa.key) {
            this.itemsRef.update(tarefa.key, { ordem: index });
          }
        });
        observer.next();
        observer.complete();
      } else {
        observer.error('Items reference is not defined.');
      }
    });
  }
}

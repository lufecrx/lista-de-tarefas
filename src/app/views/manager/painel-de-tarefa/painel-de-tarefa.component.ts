import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TarefasRestService } from 'src/app/services/rest/tarefas-rest-service';
import { ValidationFormsService } from 'src/app/services/validation/validation-forms.service';
import { TaskItem } from '../../../model/tarefa/tarefa.interface';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormatDatePipe } from 'src/app/services/pipes/format-date.pipe';

@Component({
  selector: 'app-painel-de-tarefa',
  templateUrl: './painel-de-tarefa.component.html',
  styleUrls: ['./painel-de-tarefa.component.scss'],
})
export class PainelDeTarefaComponent implements OnInit {
  tarefas: TaskItem[] = [];
  tarefasFiltradas: any[] = [];

  formEditarTarefa!: FormGroup;
  formAddTarefa!: FormGroup;
  formErrors: any = this.validation.formErrors;

  loading: boolean = false;

  avatar: string = './assets/img/avatars/pig.png';

  constructor(
    private tarefasService: TarefasRestService,
    private formBuilder: FormBuilder,
    private validation: ValidationFormsService,
    private formatDate: FormatDatePipe
  ) { }

  ngOnInit(): void {
    this.getTarefas();
    this.formEditarTarefa = this.formBuilder.group({
      tarefa: ['', [Validators.required]],
      dataLimite: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validation.formRules.datePattern),
        ],
      ],
      custo: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validation.formRules.currencyPattern)
        ]
      ],
    });

    this.formAddTarefa = this.formBuilder.group({
      tarefa: ['', [Validators.required]],
      dataLimite: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validation.formRules.datePattern),
        ],
      ],
      custo: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validation.formRules.currencyPattern)
        ]
      ],
    });
  }

  // Variables to hold filter values
  tarefaFilter: string = '';
  dataLimiteFilter: string = '';
  custoMinFilter: string = '';
  custoMaxFilter: string = '';

  // Function to apply filters
  applyFilters() {
    this.tarefasFiltradas = this.tarefas.filter((tarefa) => {
      const dataLimiteMatch = this.dataLimiteFilter === '' || tarefa.dataLimite === this.dataLimiteFilter;
      const tarefaMatch = this.tarefaFilter === '' || tarefa.tarefa === this.tarefaFilter;
      const custoMinMatch = this.custoMinFilter === '' || parseFloat(tarefa.custo) >= parseFloat(this.custoMinFilter) || isNaN(parseFloat(this.custoMinFilter));
      const custoMaxMatch = this.custoMaxFilter === '' || parseFloat(tarefa.custo) <= parseFloat(this.custoMaxFilter) || isNaN(parseFloat(this.custoMaxFilter));

      return dataLimiteMatch && tarefaMatch && custoMinMatch && custoMaxMatch;
    });
  }

  getTarefas(): void {
    this.loading = true;

    this.tarefasService
      .getTarefas()
      .subscribe((data: TaskItem[]) => {
        this.tarefas = data;
        // Order tasks by order number in ascending order
        this.tarefas.sort(
          (a, b) => (a.ordem) - (b.ordem)
        );
        this.tarefasFiltradas = this.tarefas;
        this.loading = false;
      });
  }

  // Functions to control modal for add tasks
  addTarefaModal: boolean = false;
  isTarefaEnviada: boolean = false;

  addTarefa() {
    this.isTarefaEnviada = false;
    this.toggleAddTarefa();
  }

  handleAddMode(event: any) {
    this.addTarefaModal = event;
  }

  toggleAddTarefa() {
    this.addTarefaModal = !this.addTarefaModal;
  }

  cancelAddTarefa() {
    this.toggleAddTarefa();
  }

  confirmAdd() {
    this.isTarefaEnviada = true;
    if (this.formAddTarefa.valid) {
      const novaTarefa = this.formAddTarefa.value;

      this.tarefasService
        .addTarefa(novaTarefa)
        .catch((error) => {
          console.error('There was an error adding the task:', error);
        });

      this.getTarefas();
      this.toggleAddTarefa();
      this.formAddTarefa.reset();
    }
  }

  // Functions to control modal for edit a task
  editarTarefaModal: boolean = false;
  isTarefaEditada: boolean = false;
  dadosDaTarefaEditada!: TaskItem;

  editarTarefa(tarefa: TaskItem) {
    this.toggleEditarTarefa();
    this.dadosDaTarefaEditada = tarefa;
    this.isTarefaEditada = false;
  }

  handleEditMode(event: any) {
    this.editarTarefaModal = event;
  }

  toggleEditarTarefa() {
    this.editarTarefaModal = !this.editarTarefaModal;
  }

  cancelarEdicao() {
    this.toggleEditarTarefa();
  }

  async confirmEdit() {
    this.isTarefaEditada = true;

    if (this.formEditarTarefa.valid) {
      const key = this.dadosDaTarefaEditada.key;
      const value = this.formEditarTarefa.value;

      if (key !== undefined) {
        try {
          await this.tarefasService.atualizarTarefa(key, value);
          this.getTarefas();
          this.toggleEditarTarefa();
        } catch (error) {
          console.error('There was an error:', error);
        }
      }
    }
  }

  // Functions to control modal for delete a task
  deletarTarefaModal: boolean = false;
  dadosDaTarefaDeletada!: TaskItem;

  deletarTarefa(tarefa: TaskItem) {
    this.toggleDeletarTarefa();
    this.dadosDaTarefaDeletada = tarefa;
  }

  handleDeleteMode(event: any) {
    this.deletarTarefaModal = event;
  }

  toggleDeletarTarefa() {
    this.deletarTarefaModal = !this.deletarTarefaModal;
  }

  cancelarExclusao() {
    this.toggleDeletarTarefa();
  }

  confirmDelete() {
    const key = this.dadosDaTarefaDeletada.key;
    if (key !== undefined) {
      this.tarefasService.deletarTarefa(key);
      this.getTarefas();
      this.toggleDeletarTarefa();
    }
  }

  // Drag and drop functions
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
    this.updateTaskOrder();
  }

  // Move up and down functions
  moveUp(index: number) {
    if (index > 0) {
      [this.tarefas[index], this.tarefas[index - 1]] = [this.tarefas[index - 1], this.tarefas[index]];
      this.updateTaskOrder();
    }
  }
  
  moveDown(index: number) {
    if (index < this.tarefas.length - 1) {
      [this.tarefas[index], this.tarefas[index + 1]] = [this.tarefas[index + 1], this.tarefas[index]];
      this.updateTaskOrder();
    }
  }

  // Update the order of the tasks
  updateTaskOrder() {
    this.tarefas.forEach((tarefa, index) => {
      tarefa.ordem = index + 1;
    });
    this.tarefasService.atualizarOrdemDasTarefas(this.tarefas).subscribe();
  }

  // Constant to set the value of the limit of the cost
  limiteDeCusto = 1000;

  // Function to get the class of the task based on the cost
  getTarefaClasse(tarefa: TaskItem): string {
    return parseFloat(tarefa.custo) >= this.limiteDeCusto ? 'tarefa-cara' : '';
  }
}


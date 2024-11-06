import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelDeTarefaComponent } from './painel-de-tarefa/painel-de-tarefa.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Gerenciador',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lista-de-tarefas'
      },
      {
        path: 'lista-de-tarefas',
        component: PainelDeTarefaComponent,
        data: {
          title: 'Painel de Tarefas',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
  PaginationModule,
  DropdownModule,
  ModalModule,
  SpinnerModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ManagerRoutingModule } from './manager-routing.module';
import { PainelDeTarefaComponent } from './painel-de-tarefa/painel-de-tarefa.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormatDatePipe } from '../../services/pipes/format-date.pipe';

@NgModule({
  declarations: [
    PainelDeTarefaComponent,
    FormatDatePipe,
  ],
  imports: [
    ManagerRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    FormsModule,
    PaginationModule,
    DropdownModule,
    ModalModule,
    NgSelectModule,
    SpinnerModule,
    DragDropModule,
  ],
  providers: [
    FormatDatePipe,
  ]
})
export class ManagerModule {
}

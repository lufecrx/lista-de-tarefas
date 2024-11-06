import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelDeTarefaComponent } from './painel-de-tarefa.component';

describe('PainelDeTarefaComponent', () => {
  let component: PainelDeTarefaComponent;
  let fixture: ComponentFixture<PainelDeTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelDeTarefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelDeTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

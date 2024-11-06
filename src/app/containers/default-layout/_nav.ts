import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Gerenciador',
    title: true
  },
  {
    name: 'Painel de Tarefas',
    url: 'manager/lista-de-tarefas',
    iconComponent: { name: 'cil-notes' },
  },
  {
    title: true,
    name: 'Connect with me',
    class: 'py-0'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/lufecrx',
    iconComponent: { name: 'cibGithub' },
    attributes: { target: '_blank', class: '-text-dark' },
    class: 'mt-auto'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/luizfelipecg/',
    iconComponent: { name: 'cibLinkedin' },
    attributes: { target: '_blank' }
  }
];

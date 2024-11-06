import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 6,
    passwordMin: 4,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
    datePattern: /^\d{4}-\d{2}-\d{2}$/,
    currencyPattern: '^[0-9]+(\.[0-9]{1,2})?$',
    identifierPattern: '^[0-9]+$',
  };

  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    identifier: '',
    tarefa: '',
    date: '',
    currency: '',
    accept: false
  };

  constructor() {
    this.errorMessages = {
      firstName: {
        required: 'Primeiro nome é obrigatório'
      },
      lastName: {
        required: 'Sobrenome é obrigatório'
      },
      username: {
        required: 'Nome de usuário é obrigatório',
        minLength: `Nome de usuário deve ter pelo menos ${this.formRules.usernameMin} caracteres`,
        pattern: 'Nome de usuário deve conter apenas letras e números'
      },
      email: {
        required: 'Email é obrigatório',
        email: 'Email inválido'
      },
      password: {
        required: 'Senha é obrigatória',
        pattern: 'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
        minLength: `Senha deve ter pelo menos ${this.formRules.passwordMin} caracteres`
      },
      confirmPassword: {
        required: 'Confirmação de senha é obrigatória',
        passwordMismatch: 'Senhas não conferem'
      },
      accept: {
        requiredTrue: 'Você deve aceitar os termos e condições'
      },
      identifier: {
        required: 'Identificador é obrigatório',
        pattern: 'Identificador deve conter apenas números'
      },
      date: {
        required: 'Data é obrigatória',
        pattern: 'Formato de data inválido'
      },
      tarefa: {
        required: 'Obrigatório preencher a tarefa'
      },
      currency: {
        required: 'Valor é obrigatório',
        pattern: 'Formato de valor inválido'
      }
    };
  }
}

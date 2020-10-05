import { Component, OnInit } from '@angular/core';
import { ClientesService, ClienteTeste } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente
  success: boolean = false
  errors: String[] = []

  constructor(
    private service: ClientesService
  ) {
    this.cliente = new Cliente()
   }

  ngOnInit(): void {
    
  }

  onSubmitForm(){
    this.errors = [];
    this.service.addCliente(this.cliente)
      .subscribe( response => this.success = true, 
                  errorResponse => this.errors = errorResponse.error.errors )

  }

}

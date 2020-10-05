import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = []
  clientSelected: Cliente
  timeOutToastr: number = 3000

  constructor(
    private service: ClientesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllClients()
  }

  getAllClients() {
    this.service.getClientes()
      .subscribe( response => this.clientes = response )
  }

  novoCadastro() {
    this.router.navigate(['/clientes-form'])
  }

  askDellClient(cliente: Cliente) {
    this.clientSelected = cliente
  }

  dellClient() {
    this.service.deleteClient(this.clientSelected)
      .subscribe( 
        response => {
          this.toastr.success('Sucesso', 'Cliente deletado', { timeOut : this.timeOutToastr })
          this.getAllClients()
        }, errorResponse => {
          this.toastr.error('Erro', 'Ocorreu um erro ao deletar o cliente', { timeOut: this.timeOutToastr })
        })
  }

}

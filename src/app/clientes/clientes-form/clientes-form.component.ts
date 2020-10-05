import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService, ClienteTeste } from 'src/app/clientes.service';
import { Cliente } from '../cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  public cliente: Cliente
  public success: boolean = false
  public errors: String[] = []
  public isEditing: boolean = false
  
  private timeOutToastr: number = 3000

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.cliente = new Cliente()
   }

  ngOnInit(): void {
    let params = this.activatedRoute.params
    
    params.subscribe( urlParams => {
      if(urlParams['id'])
        this.service.getClientById(urlParams['id'])
        .subscribe (
          response => {
            this.cliente = response
            this.isEditing = true
          },
          errorResponse => this.cliente = new Cliente() // ?
        )
     })
  }

  onSubmitForm(){
    if(!this.isEditing){
      this.service.addCliente(this.cliente)
        .subscribe( response => {
          this.toastr.success('Sucesso', 'Cliente adicionado', { timeOut: this.timeOutToastr })
          this.errors = []
          this.cliente = response
          this.router.navigate(['/clientes-lista'])
        }, errorResponse => {
          this.success = false
          this.errors = errorResponse.error.errors 
        })
    } else {
      this.service.editClient(this.cliente)
        .subscribe( response => {
          this.toastr.success('Sucesso', 'Cliente atualizado', { timeOut: this.timeOutToastr })
          this.router.navigate(['/clientes-lista'])
        }), errorResponse => {
          this.toastr.error('Erro', 'Cliente atualizado', { timeOut: this.timeOutToastr })
          this.success = false
          this.errors = errorResponse.error.errors
          
        }
    }

  }

  voltarListagem(){
    this.router.navigate(['/clientes-lista'])
  }

}

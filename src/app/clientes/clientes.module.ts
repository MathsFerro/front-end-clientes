import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientesFormComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule
  ],
  exports: [
    ClientesFormComponent
  ]
})
export class ClientesModule { }


// CRIAR ROUTING JUNTO COM O MODULE
// ng g m nome --routing

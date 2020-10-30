import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductoModel } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto = new ProductoModel()

  constructor( private productosService: ProductosService,
                private route: ActivatedRoute,
                private router: Router ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')

    if ( id !== 'nuevo') {
      this.productosService.getProducto( id )
          .subscribe( (resp: ProductoModel) => {
            this.producto = resp
            this.producto.id = id
          })
    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido')
      return
    }

        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
        })
        Swal.showLoading()

    let peticion: Observable<any>

    if ( this.producto.id ) {
      peticion = this.productosService.actualizarProducto( this.producto )
    } else {
      peticion = this.productosService.crearProducto( this.producto )
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.producto.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success',
      })

      this.router.navigateByUrl('/')
    })


  }

}

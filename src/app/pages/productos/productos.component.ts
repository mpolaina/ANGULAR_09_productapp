import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductoModel } from '../../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: ProductoModel[] = []
  cargando = false

  constructor( private productosService: ProductosService) { }

  ngOnInit() {

      this.cargando = true
      this.productosService.getProductos()
          .subscribe(  resp  => {
            this.productos = resp
            this.cargando = false
          })
  }

  borrarProducto( producto: ProductoModel, i : number ){

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'El producto desaparecerá',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Afirmativo, Si',
        cancelButtonText: 'Mejor No'
      }).then( resp => {

        if( resp.value ) {

          this.productos.splice(i, 1)
          this.productosService.deleteProducto( producto.id ).subscribe()

        }

      })

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/producto.model';
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

    private url = 'https://productos-app-2c395.firebaseio.com'

    constructor( private http: HttpClient) { }

    crearProducto( producto: ProductoModel) {

        return this.http.post(`${ this.url }/productos.json`, producto)
                .pipe(
                  map( (resp: any) => {

                    producto.id = resp.name
                    return producto

                  })
                )
    }

    actualizarProducto( producto: ProductoModel ){

        const productoTemp = {
          ...producto
        }

        delete productoTemp.id

        return this.http.put(`${ this.url }/productos/${ producto.id }.json`, productoTemp)
    }

    getProducto( id: string) {
      return this.http.get(`${ this.url }/productos/${ id }.json`)
    }

    deleteProducto( id: string ) {

      return this.http.delete(`${ this.url }/productos/${ id }.json`)
    }

    getProductos() {
        return this.http.get(`${ this.url }/productos.json`)
                .pipe(
                  map ( this.crearArray ),
                  delay(500)
                )
    }

    private crearArray( productoObj: object ) {

        const productos: ProductoModel[] = []

        if( productoObj ) {
            Object.keys( productoObj ).forEach( key => {

              const producto: ProductoModel = productoObj[key]
              producto.id = key

              productos.push( producto )
          })

          return productos;
        }
    }

}

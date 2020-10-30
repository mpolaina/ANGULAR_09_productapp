export class ProductoModel {

    id: string
    nombre: string
    descripcion: string
    cantidad: number
    comprado: string

    constructor(){

      this.comprado = 'pendiente'

    }
}

export class ProductoModel {

    id: string
    nombre: string
    descripcion: string
    cantidad: number
    comprado: boolean

    constructor(){

      this.comprado = false

    }
}

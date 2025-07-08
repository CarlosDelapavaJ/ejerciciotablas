class Usuario {
    constructor(nombre, correo) {
        this.nombre = nombre;
        this.correo = correo;
    }

    mostrarInfo() {
        return `Nombre: ${this.nombre}, Correo: ${this.correo}`;
    }
}
export default Usuario;
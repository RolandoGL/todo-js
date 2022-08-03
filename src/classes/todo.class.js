


export class Todo{
    static fromJson( {id, tarea, completado, creado} ){
        //metodo estatico para recuperar o crear las nuevas instancias que vienen del localstorage
        const temTodo = new Todo( tarea ) // se crea la nueva instancia de la clase

        temTodo.id         = id;
        temTodo.completado = completado;
        temTodo.creado     = creado;

        return temTodo; // se retorna la nueva instancia
    }
    constructor( tarea ){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}
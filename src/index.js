
import './styles.css'; //importar estilos de la app


import { Todo, TodoList } from "./classes"; // se importan las clases
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList() // se crea una nueva instancia de todoList
const { todos } = todoList
todos.forEach( crearTodoHtml );
console.log('cargarLocal: ', todos)

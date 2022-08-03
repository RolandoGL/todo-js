
import { Todo } from '../classes/todo.class'
import { todoList } from '../index.js'
//referencias al html
const divTodoList   = document.querySelector(".todo-list");
const txtInput      = document.querySelector('.new-todo')
const btnBorrar     = document.querySelector('.clear-completed')
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')
export const crearTodoHtml = (todo) => {
  const htmlTodo = ` 
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id=" ${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado)? 'checked': ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li> `;

    const div     = document.createElement('div');
    div.innerHTML = htmlTodo
    divTodoList.append( div.firstElementChild )
    return div.firstElementChild
};

txtInput.addEventListener('keyup', (event)=>{
  if(event.keyCode === 13 && txtInput.value.length > 0){

    const newTodo = new Todo( txtInput.value )
    todoList.nuevoTodo(newTodo);
    crearTodoHtml(newTodo)
    txtInput.value = ""

  }
})
divTodoList.addEventListener('click', (event)=>{

  const nombreElmento = event.target.localName 
  const todoElemento  = event.target.parentElement.parentElement;
  const todoId        = todoElemento.getAttribute('data-id')

  if(nombreElmento.includes('input')){

    todoList.marcarCompletado(todoId)
    todoElemento.classList.toggle('completed')

  }else if(nombreElmento.includes('button')){

    todoList.eliminarTodo(todoId)
    divTodoList.removeChild(todoElemento)
  
  }
})
btnBorrar.addEventListener('click', ()=>{

  todoList.eliminarCompletados();
  for( let i = divTodoList.children.length-1; i >= 0; i--){

    const elemento = divTodoList.children[i];
    if( elemento.classList.contains('completed') ){
      divTodoList.removeChild(elemento)
    }

  }
})

ulFiltors.addEventListener('click', (event)=>{
  const filtro = event.target.text;
  if( !filtro ) return
  anchorFiltros.forEach(element => element.classList.remove('selected'));
  event.target.classList.add('selected')
  for( const elemento of divTodoList.children ){
    // console.log(elemento)
    elemento.classList.remove('hidden')
    const completado = elemento.classList.contains('completed');
    switch(filtro){
      case 'Pendientes':
        if(completado){
          elemento.classList.add('hidden')
        }
        break;
      case 'Completados':
        if(!completado){
          elemento.classList.add('hidden')
        }
        break;
      
    }
  }
})
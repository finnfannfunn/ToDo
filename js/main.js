const input = document.querySelector('#input')
const list = document.querySelector('.todo-list')
const form = document.querySelector('.form')
const buttonAdd = document.querySelector('.form-button')
const todoMenu = document.querySelector('.todo-menu')
const emptyList = document.querySelector('.todo-item')

let tasks = []

if(localStorage.getItem('tasks')){
 tasks = JSON.parse(localStorage.getItem('tasks'))
 tasks.forEach((task) => renderTask(task))
}



function addTask(e){
   e.preventDefault() 
  const newTask = input.value 

   const newTasks = {
      id: Date.now(),
      text: newTask,
      done: false,
   }

   tasks.push(newTasks)

   renderTask(newTasks)
  input.value = ''
  input.focus()

 

   if(list.children.length > 1){
      emptyList.classList.add('none')
   }

   saveToLocalStorage ()
}
 

function deleteTask(e){

   if(e.target.dataset.action === 'delete'){
   const parentNode = e.target.closest('li')

   const id = Number(parentNode.id)
   

   tasks = tasks.filter((task) => task.id !== id )
   

   parentNode.remove()

 

   if(list.children.length === 1){
      emptyList.classList.remove('none')
   }
}
saveToLocalStorage ()
}

function doneTask(e){
if(e.target.dataset.action === 'done'){
const parentNode = e.target.closest('li')

const id  = Number(parentNode.id)

const task = tasks.find((task) => task.id === id)
 task.done = !task.done
       
const taskTitle = parentNode.querySelector('.todo-item__title')
taskTitle.classList.toggle('done')

}

saveToLocalStorage ()
}

function saveToLocalStorage (){
   localStorage.setItem('tasks', JSON.stringify(tasks))
}


function renderTask(task){
   const cssClass = task.done ? "todo-item__title done" : "todo-item__title"
   const taskHTML = `<li id="${task.id}" class="todo-item">
   <span class="${cssClass}">${task.text}</span>
   <div class="todo-item__buttons">
      <button class="button-done todo-button" type="button" data-action="done">done</button>
      <button class="button-delete todo-button" type="button" data-action="delete">delete</button>
   </div>
   </li>`
  list.insertAdjacentHTML('beforeend', taskHTML)
}



list.addEventListener('click', deleteTask)
list.addEventListener('click', doneTask)
form.addEventListener('submit', addTask)
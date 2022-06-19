// Define an array to hold the To Do List
let toDoList = [];

// Select the list element
let list = document.querySelector(".js-todo-list");

// Render each item added to the To Do list
function renderToDo(toDo) {
  
  // select the current to do
  let item = document.querySelector(`[data-key='${toDo.id}']`);

  if (toDo.deleted) {
    // remove the item from the DOM
    item.remove();
    return;
  }
  
  // Check the value of the to do item, and if not true, assign an empty string = false
  let isChecked = toDo.checked ? 'done' : "";

  // created a new li element for the todo
  let toDoItem = document.createElement('li');

  // 
  toDoItem.setAttribute('class', `todo-item ${isChecked}`);

  toDoItem.setAttribute('data-key', toDo.id);

  
  toDoItem.innerHTML = `
  
  <input id="${toDo.id}" type="checkbox"/>

    <label for="${toDo.id}" class="tick js-tick"></label>

    <span>${toDo.text}</span>

    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
    `;
  
  if (item) {
    list.replaceChild(toDoItem, item);
  }
  else {
    list.append(toDoItem);
  }
}

// Define a function that creates an object for each To Do Item
function addToDo(text) {
  let toDo = {
    text,
    checked: false,
    id: Date.now()
  };

  toDoList.push(toDo);
  renderToDo(toDo);
}

function toggleDone(key) {
  let index = toDoList.findIndex(item => item.id === Number(key));

  toDoList[index].checked = !toDoList[index].checked;

  renderToDo(toDoList[index]);
}

// deletetodo function takes the key as paarmeter
function deleteToDo(key) {
  let index = toDoList.findIndex((item) => item.id === Number(key));

  const toDo = {
  deleted: true,
  ...toDoList[index],
  };

  toDoList = toDoList.filter((item) => item.id !== Number(key));
 
  renderToDo(toDo);
}

// Select the form element
let form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  // Prevent the page from reloading when the form is submitted
  event.preventDefault();

  // Selects the input element
  let input = document.querySelector('.js-todo-input');
  let text = input.value.trim();

  if (text !== '') {
    addToDo(text);

    // Reset the input field 
    input.value = '';
    input.focus;
  }
})

list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    
    const itemKey = event.target.parentElement.dataset.key;

    toggleDone(itemKey);
  }
    if (event.target.classList.contains("js-delete-todo")) {
      const itemKey = event.target.parentElement.dataset.key;

      deleteToDo(itemKey);
    }
})




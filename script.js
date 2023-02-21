// Select elements we want to help us change DOM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
const checkedBtn = document.getElementById('clearchecked');

// Display items from localstorage
function displayItems() {
  // Get local storage current value
  const itemsFromStorage = getItemsFromStorage();
  // Loop over array of values once converted and run add dom function with the item
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  // Run checkUI and change state of application if required
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  // List item equals input field
  const newItem = itemInput.value;

  // Validate Input - if empty don't run
  if (newItem === '') {
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();
  // Reset input after item added
  itemInput.value = '';
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  li.appendChild(checkbox);

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  // Create variable don't point to a value
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    // If storage is empty then create empty array
    itemsFromStorage = [];
  } else {
    // If storage has values convert from string back into an array
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  // Target is icon, so check parent which is button has the class
  if (e.target.parentElement.classList.contains('remove-item')) {
    // When true run remove item and remove the buttons parent which is the ul element
    removeItem(e.target.parentElement.parentElement);
  }
  if (e.target.value === 'on') {
    e.target.parentElement.classList.toggle('done');
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  // While ul has a li first child, remove
  while (itemList.firstChild) {
    // Remove child which is the ul's first child
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from localStorage
  localStorage.removeItem('items');

  checkUI();
}

function clearChecked(e) {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const items = itemList.querySelectorAll('li');
  // console.log(checkboxes);
  for (var i = 0; i < checkboxes.length; ++i) {
    checkboxes[i].checked = false;
  }
  // items.classList.remove('done');
  items.forEach((item) => {
    if (item.classList.contains('done')) {
      item.classList.remove('done');
    }
  });
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    // -1 means element can't be found, so display everything that is available
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
    checkedBtn.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
    checkedBtn.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  checkedBtn.addEventListener('click', clearChecked);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();

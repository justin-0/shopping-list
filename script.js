const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

// Functions
function addItem(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  // Input Validation
  if (itemValue === '') return;
  createElements(itemValue);
}

function createElements(itemValue) {
  // Create list item
  const li = document.createElement('li');
  const text = document.createTextNode(itemValue);
  li.appendChild(text);
  // Create button and add classes
  const btn = document.createElement('button');
  btn.setAttribute('class', 'remove-item btn-link text-red');
  // Create Icon and add classes
  const icon = document.createElement('i');
  icon.setAttribute('class', 'fa-solid fa-xmark');
  // Append to each element in correct order
  btn.appendChild(icon);
  li.appendChild(btn);
  itemList.appendChild(li);
  itemInput.value = '';
}

// Event Listeners
itemForm.addEventListener('submit', addItem);

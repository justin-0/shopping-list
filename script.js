const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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

  // Run checkUI
  checkUI();

  itemInput.value = '';
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

function clearAll() {
  // While ul has li elements run loop
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function filterList(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    // First child is text node
    const itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Hide filter and clear all if nothing in ul
function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterList);
// Use event delegation instead of looping over items
itemList.addEventListener('click', removeItem);

checkUI();

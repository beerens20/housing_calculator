// Grab form elements
// UL id
const expenseList = document.getElementById('expense-list');
// expense name input
const expenseName = document.getElementById('expense-name');
// expense amount input
const expenseAmount = document.getElementById('expense-amount');
// input form
const itemForm = document.getElementById('item-form');
// monthly income input
const incomeInput = document.getElementById('income-input')
// clear button
const clearBtn = document.getElementById('clear');

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
};

// Add an expense to the monthly expense list
function onAddItemSubmit(e){
    e.preventDefault();
    
    // Grab the input values for expense name and amount
    const newExpenseName = expenseName.value;
    const newExpenseAmount = expenseAmount.value;

    let newExpenseObject = {
        "expenseName": newExpenseName,
        "expenseAmount": newExpenseAmount
    }

    // Create item DOM element
    addItemToDOM(newExpenseObject);

    // Add item to local storage
    addItemToStorage(newExpenseObject);

    document.getElementById('expense-name').value='';
    document.getElementById('expense-amount').value='';
};

// Add new item to the unordered expenseList
function addItemToDOM(item){
    // Create new list item with new expense values
    const li = document.createElement('li');
    // Add delete icon button
    const button = createButton('remove-item btn-link text-red');
    // Add delete button then text to new li
    li.appendChild(button);
    let expenseName = item['expenseName'];
    let expenseAmount = item['expenseAmount'];
    li.appendChild(document.createTextNode(`${expenseName}: ${expenseAmount}`));

    expenseList.appendChild(li);
    resetUI();
};

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// Create in-line delete button
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
};

// Create icon for delete button
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
};

function getItemsFromStorage(){
    let itemsFromStorage;
    //Check to see if there are already items in localStorage
    if (localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    // console.log(itemsFromStorage);
    return itemsFromStorage;

};

// Create function to handle onClick actions
function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){  // Check if target element contains the class of .remove-item
        removeItem(e.target.parentElement.parentElement);           // Call the removeItem function passing in the grandparent of the target (the LI)
    }
};

function removeItem(item){
    if (confirm("Are you sure?")){                  // Confirm before remove
        item.remove();                              // remove the target LI (item) from the DOM
        // removeItemfromStorage(item.textContent);    // Call function to remove item from localStorage
        removeItemfromStorage(item);
        resetUI();                                  // Check if list is empty, hide buttons etc if true
    }
};

function removeItemfromStorage(item){
    let list = JSON.parse(localStorage.getItem('items'));                     // Get current items in local storage and set to variable
    let expense = item.textContent.split(':')[0];
    let itemsFromStorage = [];
    for (let i = 0; i < list.length; i++){
        if (list[i].expenseName !== expense){
            itemsFromStorage = [...itemsFromStorage, list[i]];
        }
    }
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

function clearItems(){
    while (expenseList.firstChild){
        expenseList.removeChild(expenseList.firstChild);
        incomeInput.value = '';
    };
    localStorage.removeItem('items');
    resetUI();
};

function resetUI(){
    const items = expenseList.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
    }
};

// create event listener
itemForm.addEventListener('submit', onAddItemSubmit);
expenseList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
resetUI();
document.addEventListener('DOMContentLoaded', displayItems);
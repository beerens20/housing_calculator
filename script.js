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

// Add an expense to the monthly expense list
function addItem(e){
    e.preventDefault();
    
    // Grab the input values for expense name and amount
    const newExpenseName = expenseName.value;
    const newExpenseAmount = expenseAmount.value;

    // Create new list item with new expense values
    const li = document.createElement('li');
    // Add delete icon button
    const button = createButton('remove-item btn-link text-red');
    // Add delete button then text to new li
    li.appendChild(button);
    li.appendChild(document.createTextNode(`${newExpenseName}: ${newExpenseAmount}`));
    let newExpenseObject = {
        "expenseName": newExpenseName,
        "expenseAmount": newExpenseAmount
    };

    addItemToList(li);
    addItemToStorage(newExpenseObject);

}

// Add new item to the unordered expenseList
function addItemToList(li){
    expenseList.appendChild(li);
    resetUI();
    expenseName.value = '';
    expenseAmount.value = '';
}


// Create in-line delete button
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    console.log(typeof button);
    return button;
};

// Create icon for delete button
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
};

function removeItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        if (confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
            resetUI();
        }
    }
};

function clearItems(){
    while (expenseList.firstChild){
        expenseList.removeChild(expenseList.firstChild);
        incomeInput.value = '';
    };
    resetUI();
};

function addItemToStorage(item){
    let itemsFromStorage;

    //Check to see if there are already items in localStorage
    if (localStorage.getItem('items')=== null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    };
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function resetUI(){
    const items = expenseList.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
    }
};

// create event listener
itemForm.addEventListener('submit', addItem);
expenseList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
resetUI();
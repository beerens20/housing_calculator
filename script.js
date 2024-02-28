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

    // Add item to the UL expenseList
    expenseList.appendChild(li);
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
        e.target.parentElement.parentElement.remove();
    }
};

function clearItems(){
    while (expenseList.firstChild){
        expenseList.removeChild(expenseList.firstChild);
        incomeInput.value = '';
    }
};

// create event listener
itemForm.addEventListener('submit', addItem);
expenseList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
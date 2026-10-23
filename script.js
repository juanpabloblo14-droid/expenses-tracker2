// ===== DOM ELEMENTS =====
const totalDisplay = document.getElementById("totalDisplay");
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");


// ===== DATA =====
let expenses = [];


// ===== SAVE TO LOCAL STORAGE =====
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


// ===== SHOW EXPENSES ON THE PAGE =====
function readerExpenses() {
    // clear the list first so rows don't get duplicated
    expenseList.innerHTML = '';

    // the total starts at 0 and is rebuilt every time
    let totalAmount = 0;

    expenses.forEach(function (expensesItem, expensesIndex) {

        // build one row
        const li = document.createElement('li');
        li.dataset.expensesIndex = expensesIndex;
        li.textContent = `${expensesItem.description} - $${expensesItem.amount}`;
        expenseList.appendChild(li);

        // add this expense to the running total
        totalAmount = totalAmount + expensesItem.amount;

        // delte button(not a click function) 
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);
    });

    totalDisplay.textContent = totalAmount.toFixed(2);
}


// ===== ADD BUTTON =====
addBtn.addEventListener("click", function () {
    // read the inputs
    let textDisplay = descriptionInput.value.trim();
    let amount = Number(amountInput.value);

    // stop if the input is bad
    if (textDisplay === '' || amount <= 0 || isNaN(amount)) {
        return;
    }

    // add, save, and redraw
    expenses.push({ description: textDisplay, amount: amount });
    saveExpenses();
    readerExpenses();

    // clear the boxes for the next expense
    descriptionInput.value = '';
    amountInput.value = '';
});

//delete button 
expenseList.addEventListener("click", function(event){
    if(event.target.classList.contains('delete-btn')){
        const li = event.target.parentElement;
        const index = Number(li.dataset.expensesIndex);
        expenses.splice(index, 1);
        readerExpenses();
        saveExpenses();
    }
});
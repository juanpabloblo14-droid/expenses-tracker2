//DOM ELEMENTS
const totalDisplay = document.getElementById("totalDisplay");
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
//DATA ARRAY 
let expenses = [];
//ADDBUTTON 
addBtn.addEventListener("click", function(){
    let textDisplay = descriptionInput.value.trim();
    let amount = Number(amountInput.value);
    if (textDisplay === '' || amount <= 0  || isNaN(amount)){
        return;
    }
    expenses.push({description: textDisplay, amount: amount});
    saveExpenses()
    descriptionInput.value = '';
    amountInput.value = '';
});
//SAVE EXPENSES 
function saveExpenses(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
//EXPENSES READER 
function readerExpenses(){
    expenseList.innerHTML = '';
}
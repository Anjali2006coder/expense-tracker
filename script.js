let transactions = [];

function addTransaction() {
    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI();
}

function updateUI() {
    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${transaction.description} - ₹${transaction.amount}
            </span>

            <button class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    const balance = income - expense;

    document.getElementById("income").textContent = `₹${income}`;
    document.getElementById("expense").textContent = `₹${expense}`;
    document.getElementById("balance").textContent = `₹${balance}`;
}

let history = JSON.parse(localStorage.getItem('history')) || [];

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    let expression = document.getElementById('display').value;
    try {
        let result = eval(expression);
        document.getElementById('display').value = result;

        // Pievieno vēsturē un saglabā to localStorage
        history.push({ expression: expression, result: result });
        localStorage.setItem('history', JSON.stringify(history));
        updateHistory();
    } catch (error) {
        document.getElementById('display').value = 'Kļūda';
    }
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((entry, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${entry.expression} = ${entry.result} 
                        <button onclick="deleteHistory(${index})">Dzēst</button>`;
        historyList.appendChild(li);
    });
}

function deleteHistory(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

// Inicializē vēsturi, kad lapa tiek ielādēta
updateHistory();

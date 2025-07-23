const previousOperandTextElement = document.querySelector('.previous-operand');
    const currentOperandTextElement = document.querySelector('.current-operand');
    const buttons = document.querySelectorAll('button');
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
          chooseOperation(button.innerText);
        } else if (button.classList.contains('equal')) {
          compute();
        } else if (button.classList.contains('clear')) {
          clear();
        } else if (button.classList.contains('delete')) {
          deleteLast();
        } else {
          appendNumber(button.innerText);
        }
        updateDisplay();
      });
    });
    function appendNumber(number) {
      if (number === '.' && currentOperand.includes('.')) return;
      currentOperand += number;
    }
    function chooseOperation(op) {
      if (currentOperand === '') return;
      if (previousOperand !== '') {
        compute();
      }
      operation = op;
      previousOperand = currentOperand;
      currentOperand = '';
    }
    function compute() {
      const prev = parseFloat(previousOperand);
      const current = parseFloat(currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      let computation;
      switch (operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          if (current === 0) {
            alert("Erro: divisão por zero!");
            return;
          }
          computation = prev / current;
          break;
        default:
          return;
      }
      currentOperand = parseFloat(computation.toFixed(10));
      operation = undefined;
      previousOperand = '';
    }
    function clear() {
      currentOperand = '';
      previousOperand = '';
      operation = undefined;
    }
    function deleteLast() {
      currentOperand = currentOperand.toString().slice(0, -1);
    }
    function updateDisplay() {
      currentOperandTextElement.innerText = currentOperand;
      previousOperandTextElement.innerText = operation ? `${previousOperand} ${operation}` : '';
    }
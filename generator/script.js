// Заборона правої кнопки миші та гарячих клавіш
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 85 || e.keyCode === 73 || e.keyCode === 83)) {
        e.preventDefault();
        return false;
    }
});

// Повідомлення коли натиснуто 📋
const messages = [
    "Скопійовано!"
];

const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const resultInput = document.getElementById('passwordResult');
const digitInput = document.getElementById('digitCount');
const toast = document.getElementById('toast');

// Надписи коли довжина пароля коли його збільшують/зменшують
lengthInput.oninput = () => {
    let val = lengthInput.value;
    let comment = "";
    
    if (val < 6) comment = " (Мало)";
    else if (val < 12) comment = " (Вже краще)";
    else if (val < 16) comment = " (Оце надійно!)";
    else if (val < 20) comment = " (Дуже надійно)";
    else comment = " (МЕГА-НАДІЙНО!)";
    
    lengthValue.innerText = val + comment;
};

document.querySelector('.generate-btn').onclick = () => {
    let totalLen = parseInt(lengthInput.value);
    let numDigits = parseInt(digitInput.value) || 0;

    // Ліміти
    if (totalLen > 25) totalLen = 25;
    if (numDigits > totalLen) {
        numDigits = totalLen;
        digitInput.value = numDigits;
    }

    // Отримання стану нових кнопок (які замінили галочки)
    const hasSymbols = document.getElementById('checkSymbols').checked;
    const hasUpper = document.getElementById('checkUpper').checked;

    // Що буде використовуватись в паролі
    const digits = "0123456789";
    const symbols = "!@#$%^&*()_+-=";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";

    let passwordArray = [];

    // Додаємо рандомні цифри
    for (let i = 0; i < numDigits; i++) {
        passwordArray.push(digits.charAt(Math.floor(Math.random() * digits.length)));
    }

    //Для решти символів
    let charPool = lower; 
    if (hasUpper) charPool += upper;
    if (hasSymbols) charPool += symbols;

    // Дозаповнення
    while (passwordArray.length < totalLen) {
        passwordArray.push(charPool.charAt(Math.floor(Math.random() * charPool.length)));
    }

    // Перемішування спец символів,цифр та букв
    passwordArray.sort(() => Math.random() - 0.5);
    
    // Анімація проявлення
    resultInput.style.opacity = "0";
    setTimeout(() => {
        resultInput.value = passwordArray.join('');
        resultInput.style.opacity = "1";
    }, 100);
};

// ОБРОБКА КОПІЮВАННЯ
document.querySelector('.copy-btn').onclick = () => {
    // Перевірка, чи не пусте поле
    if (resultInput.value && resultInput.value !== "" && !resultInput.value.includes("Тут буде")) {
        navigator.clipboard.writeText(resultInput.value);
        
        //Рядок для з'явлення повідомлення що пароль скопійовано
        if (toast) {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            toast.innerText = randomMsg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        // Підсвітка поля
        const container = document.querySelector('.result-container');
        // Для успішного копіювання
        container.classList.add('copy-success');
        setTimeout(() => container.classList.remove('copy-success'), 500);
    } else {
        // Якщо намагаться копіювати порожне поле
        toast.innerText = "Спочатку згенеруй пароль!";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
};

import { validateSQL } from './validator.js';

document.getElementById('validateBtn').addEventListener('click', () => {
    const sqlQuery = document.getElementById('sqlInput').value;
    const result = validateSQL(sqlQuery);

    const resultElement = document.getElementById('result');
    resultElement.innerText = result.valid ? `✅ Valid SQL` : `❌ Error: ${result.error}`;
    resultElement.style.color = result.valid ? "green" : "red";
});

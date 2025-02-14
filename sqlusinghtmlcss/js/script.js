import { validateSQL } from './sqlValidator.js';

document.getElementById("validateBtn").addEventListener("click", () => {
    const query = document.getElementById("sqlInput").value;
    const result = validateSQL(query);
    
    const validationResult = document.getElementById("validationResult");
    validationResult.classList.remove("success", "error");
    validationResult.classList.add(result.valid ? "success" : "error");
    validationResult.querySelector(".alert-title").textContent = result.valid ? "Valid SQL" : "Invalid SQL";
    validationResult.querySelector(".alert-description").textContent = result.valid ? result.message : `${result.error} Suggestion: ${result.suggestion}`;
});

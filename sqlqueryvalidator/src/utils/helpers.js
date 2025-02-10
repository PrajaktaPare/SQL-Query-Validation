export function validateSQL(sql) {
    // This is a placeholder function. In a real-world scenario,
    // you would integrate with a backend service or use a SQL parser library.
    const isValid = sql.toLowerCase().includes("select") && sql.toLowerCase().includes("from")
    return {
      isValid,
      message: isValid
        ? "Your SQL query is valid."
        : "Your SQL query is invalid. Make sure it includes SELECT and FROM clauses.",
    }
  }
  
  export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Copying to clipboard was successful!")
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }
  
  
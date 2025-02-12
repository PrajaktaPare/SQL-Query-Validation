// SQL Syntax Rules
const sqlRules = {
    ddl: /^(CREATE|DROP|ALTER)\s+(TABLE|DATABASE|VIEW|INDEX)\s+/i,
    dml: /^(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+/i,
    dcl: /^(GRANT|REVOKE)\s+/i,
    tcl: /^(COMMIT|ROLLBACK|SAVEPOINT|SET\s+TRANSACTION)\s+/i,
    view: /^CREATE\s+VIEW\s+\w+\s+AS\s+SELECT\s+/i,
    cursor: /^DECLARE\s+\w+\s+CURSOR\s+FOR\s+SELECT\s+/i,
    trigger: /^CREATE\s+TRIGGER\s+\w+\s+/i
};

// Validate SQL Query
export function validateSQL(query) {
    const trimmedQuery = query.trim().toUpperCase();

    // Identify query type
    let queryType = null;
    for (const [type, regex] of Object.entries(sqlRules)) {
        if (regex.test(trimmedQuery)) {
            queryType = type;
            break;
        }
    }

    if (!queryType) {
        return { valid: false, error: "Unknown SQL type. Check syntax." };
    }

    // Check detailed syntax
    return checkSyntax(trimmedQuery, queryType);
}

// Function to check SQL syntax for errors
function checkSyntax(query, type) {
    switch (type) {
        case "ddl":
            if (!query.match(/\s+\w+/)) return { valid: false, error: "Missing table or database name." };
            break;
        case "dml":
            if (!query.includes("FROM") && !query.includes("INTO"))
                return { valid: false, error: "Missing FROM or INTO clause." };
            break;
        case "dcl":
            if (!query.includes("ON")) return { valid: false, error: "Missing ON clause." };
            break;
        case "tcl":
            if (!query.match(/(COMMIT|ROLLBACK|SAVEPOINT)/))
                return { valid: false, error: "Invalid TCL statement." };
            break;
        case "view":
            if (!query.includes("SELECT")) return { valid: false, error: "Missing SELECT statement for VIEW." };
            break;
        case "cursor":
            if (!query.includes("SELECT")) return { valid: false, error: "Missing SELECT in CURSOR declaration." };
            break;
        case "trigger":
            if (!query.includes("BEFORE") && !query.includes("AFTER"))
                return { valid: false, error: "Trigger must include BEFORE or AFTER." };
            break;
    }

    return { valid: true, message: "Valid SQL Query" };
}

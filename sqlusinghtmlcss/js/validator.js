// SQL Syntax Rules
const sqlRules = {
    ddl: /^(CREATE|DROP|ALTER)\s+(TABLE|DATABASE|VIEW|INDEX|SCHEMA|SEQUENCE|FUNCTION|PROCEDURE|TRIGGER)\s+/i,
    dml: /^(SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|MERGE)\s+/i,
    dcl: /^(GRANT|REVOKE)\s+/i,
    tcl: /^(COMMIT|ROLLBACK|SAVEPOINT|SET\s+TRANSACTION)\s+/i,
    view: /^CREATE\s+VIEW\s+\w+\s+AS\s+SELECT\s+/i,
    cursor: /^DECLARE\s+\w+\s+CURSOR\s+FOR\s+SELECT\s+/i,
    trigger: /^CREATE\s+TRIGGER\s+\w+\s+/i,
    explain: /^EXPLAIN\s+/i,
    show: /^SHOW\s+\w+/i,
    describe: /^(DESC|DESCRIBE)\s+\w+/i,
    set: /^SET\s+\w+\s*=\s*\w+/i,
    with: /^WITH\s+\w+\s+AS\s*\(/i
};

// Validate SQL Query
export function validateSQL(query) {
    const trimmedQuery = query.trim();

    // Identify query type
    let queryType = null;
    for (const [type, regex] of Object.entries(sqlRules)) {
        if (regex.test(trimmedQuery)) {
            queryType = type;
            break;
        }
    }

    if (!queryType) {
        return { 
            valid: false, 
            error: "Unknown or malformed SQL query.",
            suggestion: "Check if the query starts with a valid SQL keyword (e.g., SELECT, INSERT INTO, CREATE TABLE)."
        };
    }

    // Check detailed syntax
    return checkSyntax(trimmedQuery, queryType);
}

// Function to check SQL syntax for errors
function checkSyntax(query, type) {
    let error = null;
    let suggestion = null;

    switch (type) {
        case "ddl":
            if (!query.match(/\s+\w+/)) {
                error = "Missing table, database, or schema name.";
                suggestion = "Ensure a valid name is provided after CREATE, DROP, or ALTER.";
            }
            break;

        case "dml":
            if (query.startsWith("INSERT")) {
                if (!query.includes("INTO")) {
                    error = "INSERT query missing INTO clause.";
                    suggestion = "Use 'INSERT INTO table_name VALUES (...)'.";
                } else if (!query.includes("VALUES") && !query.includes("SELECT")) {
                    error = "INSERT query missing VALUES or SELECT statement.";
                    suggestion = "Ensure 'VALUES (...)' or 'SELECT ...' follows the table name.";
                }
            } else if (query.startsWith("UPDATE")) {
                if (!query.includes("SET")) {
                    error = "UPDATE query missing SET clause.";
                    suggestion = "Use 'UPDATE table_name SET column = value WHERE condition'.";
                }
            } else if (query.startsWith("DELETE")) {
                if (!query.includes("FROM")) {
                    error = "DELETE query missing FROM clause.";
                    suggestion = "Use 'DELETE FROM table_name WHERE condition'.";
                }
            } else if (query.startsWith("SELECT")) {
                if (!query.includes("FROM")) {
                    error = "SELECT query missing FROM clause.";
                    suggestion = "Use 'SELECT column_name FROM table_name'.";
                }
            }
            break;

        case "dcl":
            if (!query.includes("ON")) {
                error = "DCL query missing ON clause.";
                suggestion = "Ensure 'GRANT privilege ON table TO user' or similar format.";
            }
            break;

        case "tcl":
            if (!query.match(/(COMMIT|ROLLBACK|SAVEPOINT)/)) {
                error = "Invalid TCL statement.";
                suggestion = "Use a valid transaction control statement like COMMIT, ROLLBACK, or SAVEPOINT.";
            }
            break;

        case "view":
            if (!query.includes("SELECT")) {
                error = "VIEW query must contain SELECT statement.";
                suggestion = "Use 'CREATE VIEW view_name AS SELECT ...'.";
            }
            break;

        case "cursor":
            if (!query.includes("SELECT")) {
                error = "Cursor must be declared with a SELECT statement.";
                suggestion = "Use 'DECLARE cursor_name CURSOR FOR SELECT ...'.";
            }
            break;

        case "trigger":
            if (!query.includes("BEFORE") && !query.includes("AFTER")) {
                error = "Trigger must include BEFORE or AFTER.";
                suggestion = "Use 'CREATE TRIGGER trigger_name BEFORE/AFTER INSERT/UPDATE/DELETE ON table_name'.";
            }
            break;

        case "explain":
            if (!query.includes("SELECT") && !query.includes("INSERT") && !query.includes("UPDATE") && !query.includes("DELETE")) {
                error = "EXPLAIN must be followed by a valid SQL query.";
                suggestion = "Use 'EXPLAIN SELECT ...' or 'EXPLAIN INSERT ...'.";
            }
            break;

        case "show":
            if (!query.match(/^SHOW\s+(TABLES|DATABASES|INDEXES|COLUMNS)/i)) {
                error = "SHOW query must specify TABLES, DATABASES, INDEXES, or COLUMNS.";
                suggestion = "Use 'SHOW TABLES' or 'SHOW DATABASES'.";
            }
            break;

        case "describe":
            if (!query.match(/^DESCRIBE\s+\w+/i)) {
                error = "DESCRIBE must be followed by a table or column name.";
                suggestion = "Use 'DESCRIBE table_name'.";
            }
            break;

        case "set":
            if (!query.includes("=")) {
                error = "SET statement must include assignment.";
                suggestion = "Use 'SET variable = value'.";
            }
            break;

        case "with":
            if (!query.includes("AS")) {
                error = "WITH clause must define an alias using AS.";
                suggestion = "Use 'WITH alias AS (SELECT ...)'.";
            }
            break;
    }

    if (error) {
        return { valid: false, error, suggestion };
    }

    return { valid: true, message: "Valid SQL Query" };
}

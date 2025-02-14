import re
from flask import Flask, request, render_template

app = Flask(__name__)

# Reserved SQL Keywords
SQL_RESERVED_KEYWORDS = {
    "SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "AS",
    "JOIN", "GROUP", "ORDER", "BY", "HAVING", "DISTINCT", "INTO",
    "VALUES", "CREATE", "TABLE", "ALTER", "DROP", "INDEX", "VIEW",
    "PRIMARY", "FOREIGN", "KEY", "CHECK", "REFERENCES", "CONSTRAINT"
}

# SQL Statement Patterns
SQL_PATTERNS = {
    "UPDATE": r"^\s*UPDATE\s+(\w+)\s+SET\s+[\w]+\s*=\s*(?:'[^']*'|\d+|[\w]+[\s]*[+\-*/][\s]*[\w]+)(?:\s*,\s*[\w]+\s*=\s*(?:'[^']*'|\d+|[\w]+[\s]*[+\-*/][\s]*[\w]+))*\s*(?:WHERE\s+.+)?\s*;\s*$",
    "CREATE": r"^\s*CREATE\s+TABLE\s+(\w+)\s*\(\s*(?:\w+\s+\w+(?:\(\d+(?:,\d+)?\))?(?:\s+PRIMARY\s+KEY|\s+NOT\s+NULL|\s+AUTO_INCREMENT|\s+UNIQUE|\s+DEFAULT\s+('[^']*'|\d+))?\s*(?:,\s*\w+\s+\w+(?:\(\d+(?:,\d+)?\))?(?:\s+PRIMARY\s+KEY|\s+NOT\s+NULL|\s+AUTO_INCREMENT|\s+UNIQUE|\s+DEFAULT\s+('[^']*'|\d+))?\s*)*)(?:,\s*PRIMARY\s+KEY\s*\(\s*\w+\s*\))?\s*\)\s*;\s*$",

}

# Function to extract identifiers
def extract_identifiers(sql_query):
    identifiers = re.findall(r"\b(?:FROM|INTO|TABLE|JOIN|SET|WHERE)\s+(\w+)", sql_query, re.IGNORECASE)
    identifiers += re.findall(r"\b(?:VALUES|SET)\s*\(\s*([\w\s,]+)\s*\)", sql_query, re.IGNORECASE)
    identifiers = [item.strip() for sublist in identifiers for item in sublist.split(",")]
    return list(set([id for id in identifiers if id]))



# Validate CREATE query
def check_sql_syntax(sql_query):
    sql_query = sql_query.strip()
    sql_query = re.sub(r"--.*?$|/\*.*?\*/", "", sql_query, flags=re.MULTILINE)
    
    for stmt, pattern in SQL_PATTERNS.items():
        match = re.match(pattern, sql_query, re.IGNORECASE)
        if match:
            warnings = validate_update_query(sql_query) if stmt == "UPDATE" else validate_create_query(sql_query)
            return f"✅ Syntax is correct for {stmt} statement." + ("\n" + "\n".join(warnings) if warnings else "")
    
    return "❌ Syntax error detected!"


# Validate UPDATE query
def validate_update_query(sql_query):
    warnings = []
    
    # Check for missing WHERE clause
    if re.match(r"^\s*UPDATE\s+\w+\s+SET\s+", sql_query, re.IGNORECASE) and "WHERE" not in sql_query:
        warnings.append("⚠️ Warning: Missing WHERE clause. This will update all rows!")
    
    if re.search(r"WHERE\s+[^()]+OR\s+[^()]+", sql_query, re.IGNORECASE) and not re.search(r"WHERE\s*\([^)]*\)", sql_query, re.IGNORECASE):
        warnings.append("⚠️ Warning: OR condition detected without parentheses! This might cause unintended updates.")


    # Check for reserved keywords used as column/table names
    identifiers = extract_identifiers(sql_query)
    for identifier in identifiers:
        if identifier.upper() in SQL_RESERVED_KEYWORDS:
            warnings.append(f"⚠️ Warning: '{identifier}' is a reserved SQL keyword.")
    
    return warnings

# SQL Syntax Checking
def check_sql_syntax(sql_query):
    sql_query = sql_query.strip()
    sql_query = re.sub(r"--.*?$|/\*.*?\*/", "", sql_query, flags=re.MULTILINE)
    
    for stmt, pattern in SQL_PATTERNS.items():
        match = re.match(pattern, sql_query, re.IGNORECASE)
        if match:
            warnings = validate_update_query(sql_query)
            return f"✅ Syntax is correct for {stmt} statement." + ("\n" + "\n".join(warnings) if warnings else "")
    
    return "❌ Syntax error detected!"

@app.route("/", methods=["GET", "POST"])
def index():
    result = ""
    sql_query = ""

    if request.method == "POST":
        sql_query = request.form.get("sql_query", "")
        if sql_query:
            try:
                result = check_sql_syntax(sql_query)
            except Exception as e:
                result = f"❌ An error occurred: {str(e)}"

    return render_template("index.html", result=result, sql_query=sql_query)

if __name__ == "__main__":
    app.run(debug=True)

# Additional UPDATE query test cases
TEST_UPDATE_QUERIES = [
    "UPDATE employees SET salary = 5000 WHERE id = 10;",
    "UPDATE employees SET salary = salary * 1.1 WHERE department = 'HR';",
    "UPDATE users SET name = 'John Doe', email = 'john@example.com' WHERE user_id = 2;",
    "UPDATE employees SET bonus = 1000 WHERE department = 'Sales' AND experience > 5;",
    "UPDATE products SET price = price * 0.9 WHERE category = 'Electronics' OR stock < 5;",
    "UPDATE employees SET salary = (SELECT AVG(salary) FROM employees) WHERE department = 'HR';",
    "UPDATE employees SET salary = CASE WHEN department = 'HR' THEN salary * 1.1 ELSE salary * 1.05 END WHERE id > 100;",
    "UPDATE employees JOIN departments ON employees.department_id = departments.id SET employees.salary = employees.salary + 500 WHERE departments.name = 'Finance';",
    "UPDATE orders SET status = 'Shipped', updated_at = NOW() WHERE (status = 'Pending' AND created_at < '2024-01-01') OR (priority = 'High' AND stock > 10);",
]

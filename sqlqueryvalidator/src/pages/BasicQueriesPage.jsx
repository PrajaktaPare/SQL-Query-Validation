export default function BasicQueriesPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Basic SQL Queries</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">SELECT Statement</h2>
            <p>
              The SELECT statement is used to select data from a database. The data returned is stored in a result table,
              called the result-set.
            </p>
            <pre className="bg-muted p-4 rounded-md mt-2">
              <code>SELECT column1, column2, ... FROM table_name;</code>
            </pre>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">WHERE Clause</h2>
            <p>The WHERE clause is used to filter records.</p>
            <pre className="bg-muted p-4 rounded-md mt-2">
              <code>SELECT column1, column2, ... FROM table_name WHERE condition;</code>
            </pre>
          </section>
          {/* Add more sections for other basic query types */}
        </div>
      </div>
    )
  }
  
  
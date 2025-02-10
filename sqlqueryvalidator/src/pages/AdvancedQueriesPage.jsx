export default function AdvancedQueriesPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Advanced SQL Queries</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">JOIN Operations</h2>
            <p>JOIN clauses are used to combine rows from two or more tables, based on a related column between them.</p>
            <pre className="bg-muted p-4 rounded-md mt-2">
              <code>
                SELECT Orders.OrderID, Customers.CustomerName FROM Orders INNER JOIN Customers ON Orders.CustomerID =
                Customers.CustomerID;
              </code>
            </pre>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3">Subqueries</h2>
            <p>A subquery is a query within another query.</p>
            <pre className="bg-muted p-4 rounded-md mt-2">
              <code>
                SELECT column_name(s) FROM table_name WHERE column_name OPERATOR (SELECT column_name FROM table_name WHERE
                condition);
              </code>
            </pre>
          </section>
          {/* Add more sections for other advanced query types */}
        </div>
      </div>
    )
  }
  
  
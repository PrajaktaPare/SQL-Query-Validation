export function Card({ children }) {
    return <div className="border rounded-lg p-4 shadow-md">{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="p-4 border-b">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h2 className="text-lg font-bold">{children}</h2>;
  }
  
  export function CardDescription({ children }) {
    return <p className="text-sm text-gray-500">{children}</p>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  
export function Alert({ children }) {
    return <div className="bg-red-500 text-white p-2 rounded">{children}</div>;
  }
  
  export function AlertTitle({ children }) {
    return <h3 className="font-bold">{children}</h3>;
  }
  
  export function AlertDescription({ children }) {
    return <p className="text-sm">{children}</p>;
  }
  
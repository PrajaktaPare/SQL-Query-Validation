export function Input({ type = "text", placeholder, className = "", ...props }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`border px-2 py-1 rounded w-full ${className}`}
        {...props}
      />
    );
  }
  
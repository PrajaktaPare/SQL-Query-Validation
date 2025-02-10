import { ThemeProvider } from "./components/theme-provider"
import SQLValidator from "./components/SQLValidator"
import DarkModeToggle from "./components/DarkModeToggle"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <nav className="p-4 flex justify-end">
          <DarkModeToggle />
        </nav>
        <main className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">SQL Validator</h1>
          <SQLValidator />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App


import { Link } from "react-router-dom"
import { Button } from '../components/ui/Button'; 

import DarkModeToggle from "./DarkModeToggle"

export default function Navigation() {
  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold">
            SQL Validator
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/validator">
              <Button variant="ghost">Validator</Button>
            </Link>
            <Link to="/query-info">
              <Button variant="ghost">Query Info</Button>
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}


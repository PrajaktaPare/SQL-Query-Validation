"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import Login from "../components/Login"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold mb-6">Welcome to SQL Validator</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Validate your SQL queries, learn about different types of queries, and improve your database skills.
      </p>
      <Button onClick={() => setShowLogin(true)} className="text-lg px-6 py-3">
        Get Started
      </Button>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  )
}


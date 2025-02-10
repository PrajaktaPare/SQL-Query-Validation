import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card"

export default function QueryInfoPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Query Information</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Queries</CardTitle>
            <CardDescription>Learn about fundamental SQL queries</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/query-info/basic" className="text-primary hover:underline">
              Explore Basic Queries
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advanced Queries</CardTitle>
            <CardDescription>Dive into complex SQL operations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/query-info/advanced" className="text-primary hover:underline">
              Explore Advanced Queries
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export const AssignmentIndex = () => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>List assignments</CardTitle>
                    <CardDescription>List of assignment letter</CardDescription>
                </div>
                <Link to="/backoffice/assignments/create">
                    <Button variant='outline' >
                        Add Assignment
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export const AnnouncementIndex = () => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle>List announcements</CardTitle>
                    <CardDescription>List of announcements</CardDescription>
                </div>
                <Link to="/backoffice/announcements/create">
                    <Button variant='outline' >
                        Add Announcment
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}
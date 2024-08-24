import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const Backoffice = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-1" >
                <CardHeader>
                    <CardTitle>Total User</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
            <Card className="col-span-1" >
                <CardHeader>
                    <CardTitle>Total Assignment</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
            <Card className="col-span-1" >
                <CardHeader>
                    <CardTitle>Total Activity</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
        </div>
    )
}
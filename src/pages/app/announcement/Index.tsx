import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaginatedTable } from "@/components/ui/paginated-table"
import { Announcement } from "@/model/announcement.model"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"

const columnDefs: ColumnDef<Announcement>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'title',
        header: 'Email',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: (info) => info.getValue(),
    },
];

export const AnnouncementIndex = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
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
                <PaginatedTable<Announcement>
                    columnDefs={columnDefs}
                    endpoint="/announcement"
                    pageSize={10}
                />
            </CardContent>
        </Card>
    )
}
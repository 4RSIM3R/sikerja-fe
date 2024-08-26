import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaginatedTable } from "@/components/ui/paginated-table"
import { Announcement } from "@/model/announcement.model"
import { IconDetails, IconEye, IconTrash } from "@tabler/icons-react"
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
        header: 'Title',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: (info) => (
            <>
                <div className="flex flex-row items-center space-x-2">
                    <Link to={`/backoffice/announcements/${info.row.original.id}`}>
                        <Button variant='outline' size='icon'>
                            <IconEye className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Button variant='outline' size='icon'>
                        <IconTrash className="h-5 w-5" />
                    </Button>
                </div>
            </>
        ),
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
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaginatedTable } from "@/components/ui/paginated-table"
import { User } from "@/model/user.model"
import { IconDetails, IconEye, IconTrash } from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"

const columnDefs: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => (
            <>
                {info.row.original.roles[0].name}
            </>
        ),
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: (info) => (
            <>
                <div className="flex flex-row items-center space-x-2">
                    <Link to={`/backoffice/users/${info.row.original.id}`}>
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

export const UserIndex = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>List users</CardTitle>
                    <CardDescription className="mt-1" >List of sikerja users</CardDescription>
                </div>
                <Link to="/backoffice/users/create">
                    <Button variant='outline' >
                        Add New User
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <PaginatedTable<User>
                    columnDefs={columnDefs}
                    endpoint="/user"
                    pageSize={10}
                />
            </CardContent>
        </Card>
    )
}
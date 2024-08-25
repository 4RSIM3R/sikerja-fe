import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaginatedTable } from "@/components/ui/paginated-table"
import { User } from "@/model/user.model"
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
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: (info) => info.getValue(),
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
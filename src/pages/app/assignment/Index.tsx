import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaginatedTable } from "@/components/ui/paginated-table";
import { Assignment } from "@/model/assignment.model";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom"

const columnDefs: ColumnDef<Assignment>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'number',
        header: 'Number',
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
];

export const AssignmentIndex = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
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
                <PaginatedTable<Assignment>
                    columnDefs={columnDefs}
                    endpoint="/assignment"
                    pageSize={10}
                />
            </CardContent>
        </Card>
    )
}
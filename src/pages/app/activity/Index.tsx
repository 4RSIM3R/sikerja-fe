import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaginatedTable } from "@/components/ui/paginated-table"
import { Activity } from "@/model/activity.model"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"

const columnDefs: ColumnDef<Activity>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'report_period_start',
        header: 'Report Period Start',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'report_period_end',
        header: 'Report Period End',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'execution_task',
        header: 'Execution Task',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'report',
        header: 'Report',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: (info) => info.getValue(),
    },
];

export const ActivityIndex = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>List activities</CardTitle>
                    <CardDescription className="mt-1" >List of activities</CardDescription>
                </div>
                <Link to="/backoffice/activities/create">
                    <Button variant='outline' >
                        Add Activities
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <PaginatedTable<Activity>
                    columnDefs={columnDefs}
                    endpoint="/activity"
                    pageSize={10}
                />
            </CardContent>
        </Card>
    )
}
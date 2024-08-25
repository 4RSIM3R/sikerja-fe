import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { http } from '@/lib/http';
import { PaginationControls } from './pagination-control';

interface PaginatedTableProps<T> {
    columnDefs: ColumnDef<T>[];
    endpoint: string;
    pageSize?: number;
}

export const PaginatedTable = <T extends any>({
    columnDefs,
    endpoint,
}: PaginatedTableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const fetchItems = async (page: number) => {
        const axiosInstance = http(true);
        const response = await axiosInstance.get(`${endpoint}?page=${page}`);
        return response.data;
    };

    // Use TanStack Query to fetch data
    const { data, isLoading, isError } = useQuery({
        queryKey: ['items', currentPage], // Define the queryKey explicitly in the options object
        queryFn: () => fetchItems(currentPage),

    });

    // TanStack Table instance
    const table = useReactTable({
        data: data?.data.items || [],
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data...</p>;

    return (
        <>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <PaginationControls
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                prevPage={data?.data.prev_page}
                nextPage={data?.data.next_page}
            />
        </>
    );
};

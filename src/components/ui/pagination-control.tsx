import React from 'react';
import { Button } from './button';

interface PaginationControlsProps {
    currentPage: number;
    setCurrentPage: (page: number) => any;
    prevPage: number | null;
    nextPage: number | null;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    setCurrentPage,
    prevPage,
    nextPage,
}) => {
    if (!prevPage && !nextPage) return null; // No pagination if there is only one page

    return (
        <div className="flex justify-between items-center mt-4">
            {prevPage && (
                <Button
                    onClick={() => {
                        const prev = Math.max(currentPage - 1, 1);
                        setCurrentPage(prev);
                    }}
                    variant="outline"
                >
                    Previous
                </Button>
            )}
            <span className="mx-4">Page {currentPage}</span>
            {nextPage && (
                <Button
                    onClick={() => {
                        const next = currentPage + 1;
                        setCurrentPage(next);
                    }}
                    variant="outline"
                >
                    Next
                </Button>
            )}
        </div>
    );
};

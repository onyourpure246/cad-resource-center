import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { PaginationFooterProps } from '@/types/components';

const PaginationFooter = ({ currentPage, totalPages, onPageChange }: PaginationFooterProps) => {
    return (
        <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-4 p-2 rounded border border-muted">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium text-muted-foreground">
                    {currentPage} / {totalPages}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default PaginationFooter;

import React from 'react';
import { DataTableColumn } from '@/types/common';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import StatusBadge from '@/components/Common/StatusBadge';
import ActionsCell from '@/components/DataTable/ActionsCell';

type ColumnHelper<T> = {
    text: (
        accessorKey: keyof T,
        header: string,
        options?: {
            sortable?: boolean;
            onSort?: (key: keyof T) => void;
        } & Partial<DataTableColumn<T>>
    ) => DataTableColumn<T>;

    date: (
        accessorKey: keyof T,
        header: string,
        options?: {
            sortable?: boolean;
            onSort?: (key: keyof T) => void;
        } & Partial<DataTableColumn<T>>
    ) => DataTableColumn<T>;

    status: (
        accessorKey: keyof T,
        header: string,
        options?: {
            mapping?: Record<string, string>;
            variant?: "default" | "secondary" | "destructive" | "outline";
        } & Partial<DataTableColumn<T>>
    ) => DataTableColumn<T>;

    actions: (
        options: {
            onEdit?: (item: T) => void;
            onDelete?: (item: T) => void;
            editLabel?: string;
            deleteLabel?: string;
            additionalActions?: (item: T) => Array<{
                label: string;
                onClick: () => void;
                icon?: React.ReactNode;
                className?: string;
                disabled?: boolean;
            }>;
            align?: "start" | "end" | "center";
        } & Partial<DataTableColumn<T>>
    ) => DataTableColumn<T>;

    custom: (
        column: DataTableColumn<T>
    ) => DataTableColumn<T>;
};

export const createColumnHelper = <T,>(): ColumnHelper<T> => {
    return {
        text: (accessorKey, header, options = {}) => {
            const isSortable = options.sortable && options.onSort;
            return {
                accessorKey: String(accessorKey),
                header: isSortable ? (
                    <Button
                        variant="ghost"
                        onClick={() => options.onSort?.(accessorKey)}
                        className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full"
                    >
                        {header}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <span className="font-bold uppercase tracking-wider text-muted-foreground">{header}</span>
                ),
                cell: (item) => <span className="font-medium">{String(item[accessorKey] || '-')}</span>,
                ...options,
            };
        },

        date: (accessorKey, header, options = {}) => {
            const isSortable = options.sortable && options.onSort;
            return {
                accessorKey: String(accessorKey),
                header: isSortable ? (
                    <Button
                        variant="ghost"
                        onClick={() => options.onSort?.(accessorKey)}
                        className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full"
                    >
                        {header}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <span className="font-bold uppercase tracking-wider text-muted-foreground">{header}</span>
                ),
                cell: (item) => {
                    const val = item[accessorKey];
                    return (
                        <span className="text-muted-foreground text-sm">
                            {val ? format(new Date(val as string | number | Date), 'dd MMM yyyy HH:mm', { locale: th }) : '-'}
                        </span>
                    );
                },
                ...options,
            };
        },

        status: (accessorKey, header, { mapping, variant, ...rest } = {}) => ({
            accessorKey: String(accessorKey),
            header: <span className="font-bold uppercase tracking-wider text-muted-foreground">{header}</span>,
            cell: (item) => {
                const val = String(item[accessorKey]);
                return <StatusBadge status={val} mapping={mapping} variant={variant} />;
            },
            ...rest,
        }),

        actions: ({ onEdit, onDelete, editLabel, deleteLabel, additionalActions, align = "end", ...rest }) => ({
            accessorKey: 'actions',
            header: '',
            cell: (item) => (
                <ActionsCell
                    onEdit={onEdit ? () => onEdit(item) : undefined}
                    onDelete={onDelete ? () => onDelete(item) : undefined}
                    editLabel={editLabel}
                    deleteLabel={deleteLabel}
                    additionalActions={additionalActions ? additionalActions(item) : []}
                    align={align}
                />
            ),
            className: 'w-[50px]',
            ...rest
        }),

        custom: (column) => column
    };
};

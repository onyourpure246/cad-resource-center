import { ReactNode } from "react";

// API & Actions
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export type ActionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ success: boolean; message: string }>

export type State = {
    success: boolean,
    message: string,
    errors?: Record<string, string[] | undefined>;
};

// DataTable
export interface DataTableColumn<T> {
    accessorKey: keyof T | string;
    header: ReactNode;
    cell: (item: T) => ReactNode;
    className?: string;
    headerClassName?: string;
}

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    isLoading: boolean;
    noResultsMessage?: string;
    noResultsContent?: ReactNode;
    enableRowSelection?: boolean;
    selectedIds?: (string | number)[];
    onSelectionChange?: (selectedIds: (string | number)[]) => void;
}

// UI Components
export interface ReusableDialogProps {
    trigger: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface ReusableDrawerProps {
    trigger?: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

export type btnSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'

export type SubmitButtonProps = {
    className: string,
    size?: btnSize,
    text?: string,
    disabled?: boolean
}

export type CategoryItem = {
    CATEGORY_ID: number | string;
    CATEGORY_NAME: string;
};

export type CategorySelectProps = {
    name: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
    categories: CategoryItem[];
};

export type DatePickerProps = {
    name: string;
    label: string;
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
}

export interface FormContainerProps {
    action: (payload: FormData) => void;
    state: State;
    children: React.ReactNode;
}

export type TextAreaInputProps = {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
}

export type FormInputProps = {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
    title?: string;
    errorMessage?: string;
    disabled?: boolean;
}

export interface HeaderProps {
    title: string;
    description: string | null;
    children?: React.ReactNode;
}

export interface DropDownMenuProps {
    trigger: React.ReactNode
    children: React.ReactNode
}

export interface DateAndTimeProps {
    dateName?: string;
    timeName?: string;
    dateLabel?: string;
    timeLabel?: string;
    dateValue?: Date;
    timeValue?: string;
    onDateChange: (date: Date | undefined) => void;
    onTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
